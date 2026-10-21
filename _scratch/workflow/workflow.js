#!/usr/bin/env node
/**
 * bpi-to-blog-post-workflow.js — BPI document → committed Hexo blog post.
 *
 * Usage: node bpi-to-blog-post-workflow.js <path-to-bpi.md> <publish-date YYYY-MM-DD>
 *
 * Orchestrates the pipeline described in bpi-to-blog-post-pipeline.md:
 *
 *   1.  validate-bpi        (deterministic) — input file checks
 *   2.  curate-input        (deterministic) — build workdir/post.json
 *   3.  derive-post-title   (agentic skill) — may update title/slug
 *   4.  select-post-category(agentic skill) — sets category
 *   5.  select-post-tags    (agentic skill) — sets tags[3]
 *   6.  select-post-image   (agentic skill) — sets image + confidence
 *   7.  validate-schema     (deterministic) — full post.json check
 *        (also runs after every agentic step, per pipeline design)
 *   8.  generate-post       (deterministic) — render source/_posts/<slug>.md
 *   9.  verify-master       (deterministic) — git lock acquired here; HEAD must be master
 *   10. create-branch       (deterministic) — git branch post/<slug> from master
 *   11. commit-post         (deterministic) — git add + commit "post(<slug>)"
 *   12. push-branch         (deterministic) — git push -u origin post/<slug>
 *   13. restore-master      (deterministic) — git checkout master; lock released
 *
 * Agentic steps call `devin -p` headless (same as example_workflow.js) and
 * are expected to mutate workdir/post.json in place.
 */

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const { validateBpi } = require('./01-validate-bpi');
const { curateInput } = require('./02-curate-input');
const { validateSchema } = require('./07-validate-schema');
const { generatePost } = require('./08-generate-post');

const DEVIN_BIN = process.env.DEVIN_BIN || 'devin';
const WORKFLOW_DIR = __dirname;
const REPO_ROOT = path.resolve(WORKFLOW_DIR, '../..');

class WorkflowError extends Error {
  constructor(stage, message) {
    super(message);
    this.stage = stage;
  }
}

function fail(stage, message) {
  throw new WorkflowError(stage, message);
}

// ---------- git operation lock (mutex with TTL) ----------
//
// Serializes the create-branch → commit-post critical section across
// concurrent workflow instances. The lock file records which zkid holds
// it and when it expires; expired locks may be stolen, so a crashed run
// self-heals after LOCK_TTL_MS instead of deadlocking.

const GIT_LOCK_PATH = path.join(WORKFLOW_DIR, 'workdir', '.git-operation.lock');
const LOCK_TTL_MS = 90_000;
const LOCK_POLL_MS = 250;

function gitLockIsExpired() {
  try {
    const { expiresAt } = JSON.parse(fs.readFileSync(GIT_LOCK_PATH, 'utf8'));
    return Date.now() >= expiresAt;
  } catch {
    return true; // unreadable/corrupt lock — treat as expired
  }
}

function acquireGitLock(zkid) {
  const payload = JSON.stringify({ zkid, expiresAt: Date.now() + LOCK_TTL_MS });
  for (;;) {
    try {
      const fd = fs.openSync(GIT_LOCK_PATH, 'wx');
      fs.writeFileSync(fd, payload);
      fs.closeSync(fd);
      console.log(`[git-lock] acquired by ${zkid} (ttl ${LOCK_TTL_MS / 1000}s)`);
      return;
    } catch (e) {
      if (e.code !== 'EEXIST') throw e;
    }
    if (gitLockIsExpired()) {
      // Steal: rename is atomic — exactly one contender wins.
      const claim = `${GIT_LOCK_PATH}.${zkid}.claim`;
      try {
        fs.renameSync(GIT_LOCK_PATH, claim);
        fs.unlinkSync(claim);
        continue;
      } catch { /* another instance won the steal */ }
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, LOCK_POLL_MS);
  }
}

function releaseGitLock(zkid) {
  try {
    const held = JSON.parse(fs.readFileSync(GIT_LOCK_PATH, 'utf8'));
    if (held.zkid !== zkid) {
      console.error(`[git-lock] warning: lock held by ${held.zkid}, not releasing`);
      return;
    }
    fs.unlinkSync(GIT_LOCK_PATH);
    console.log(`[git-lock] released by ${zkid}`);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}

// ---------- deterministic helpers ----------

function runStep(stage, fn) {
  try {
    return fn();
  } catch (e) {
    fail(stage, e.message);
  }
}

function checkSchema(workdir, stage, agenticFields = null) {
  const result = runStep(stage, () => validateSchema(workdir, agenticFields));
  for (const w of result.warnings) console.error(`[${stage}] warning: ${w}`);
  if (!result.ok) fail(stage, `schema validation failed: ${result.errors.join('; ')}`);
  return result.doc;
}

function readPostJson(workdir) {
  const p = path.join(workdir, 'post.json');
  if (!fs.existsSync(p)) fail('workflow', `post.json not found: ${p}`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// ---------- agentic helper ----------

function runSkill(skillName, workdir, repoRoot, ownedFields) {
  const traceDir = path.join(workdir, '.process');
  fs.mkdirSync(traceDir, { recursive: true });
  const tracePath = path.join(traceDir, `${skillName}.atif.json`);

  const postJsonPath = path.join(workdir, 'post.json');
  const prompt = [
    `invoke /${skillName} with working document ${postJsonPath}.`,
    `The repository root is ${repoRoot}.`,
    `Update ${postJsonPath} in place, changing only the properties this skill is responsible for.`,
  ].join(' ');

  console.log(`[agent] invoking devin-cli (headless) for /${skillName}...`);
  console.log(`[agent] ATIF trace: ${tracePath}`);

  const result = spawnSync(
    DEVIN_BIN,
    [
      '-p', prompt,
      '--permission-mode', 'dangerous',
      '--respect-workspace-trust', 'false',
      '--export', tracePath,
    ],
    { stdio: 'inherit', cwd: repoRoot },
  );

  if (result.error) fail('agent', `failed to launch devin-cli: ${result.error.message}`);
  if (result.status !== 0) fail('agent', `devin-cli exited with status ${result.status}`);

  // per-agentic-step schema check: base fields + the fields this skill owns
  checkSchema(workdir, skillName, ownedFields);
}

// ---------- workflow steps ----------

const makeAgenticStep = (skillName, ownedFields) => (ctx) => {
  runSkill(skillName, ctx.workdir, ctx.repoRoot, ownedFields);
  return { success: true };
};

const steps = {
  'validate-bpi': (ctx) => {
    runStep('validate-bpi', () => validateBpi(ctx.bpiPath));
    return { success: true };
  },
  'curate-input': (ctx) => {
    runStep('curate-input', () => curateInput(ctx.bpiPath, ctx.publishDate, ctx.workdir));
    return { success: true };
  },
  'derive-post-title': makeAgenticStep('derive-post-title', ['title', 'slug', 'title_changed']),
  'select-post-category': makeAgenticStep('select-post-category', ['category']),
  'select-post-tags': makeAgenticStep('select-post-tags', ['tags']),
  'select-post-image': makeAgenticStep('select-post-image', ['image']),
  'validate-schema': (ctx) => {
    checkSchema(ctx.workdir, 'validate-schema');
    return { success: true };
  },
  'generate-post': (ctx) => {
    runStep('generate-post', () => generatePost(ctx.workdir));
    return { success: true };
  },
  'verify-master': (ctx) => {
    const branch = gitOut(['rev-parse', '--abbrev-ref', 'HEAD'], ctx.repoRoot, 'verify-master').trim();
    if (branch !== 'master') fail('verify-master', `expected master branch, currently on ${branch}`);
    return { success: true };
  },
  'create-branch': (ctx) => {
    const slug = readPostJson(ctx.workdir).slug;
    git(['checkout', '-b', `post/${slug}`, 'master'], ctx.repoRoot, 'create-branch');
    return { success: true };
  },
  'commit-post': (ctx) => {
    const slug = readPostJson(ctx.workdir).slug;
    const postFile = `source/_posts/${slug}.md`;
    git(['add', postFile], ctx.repoRoot, 'commit-post');
    git(['commit', '-m', `post(${slug})`], ctx.repoRoot, 'commit-post');
    return { success: true };
  },
  'push-branch': (ctx) => {
    const slug = readPostJson(ctx.workdir).slug;
    git(['push', '-u', 'origin', `post/${slug}`], ctx.repoRoot, 'push-branch');
    return { success: true };
  },
  'restore-master': (ctx) => {
    git(['checkout', 'master'], ctx.repoRoot, 'restore-master');
    return { success: true };
  },
};

const nextStep = {
  'validate-bpi': 'curate-input',
  'curate-input': 'derive-post-title',
  'derive-post-title': 'select-post-category',
  'select-post-category': 'select-post-tags',
  'select-post-tags': 'select-post-image',
  'select-post-image': 'validate-schema',
  'validate-schema': 'generate-post',
  'generate-post': 'verify-master',
  'verify-master': 'create-branch',
  'create-branch': 'commit-post',
  'commit-post': 'push-branch',
  'push-branch': 'restore-master',
  'restore-master': null,
};

function git(args, cwd, stage) {
  const result = spawnSync('git', args, { stdio: 'inherit', cwd });
  if (result.error) fail(stage, `failed to launch git: ${result.error.message}`);
  if (result.status !== 0) fail(stage, `git ${args[0]} exited with status ${result.status}`);
}

function gitOut(args, cwd, stage) {
  const result = spawnSync('git', args, { encoding: 'utf8', cwd });
  if (result.error) fail(stage, `failed to launch git: ${result.error.message}`);
  if (result.status !== 0) fail(stage, `git ${args[0]} exited with status ${result.status}: ${result.stderr.trim()}`);
  return result.stdout;
}

function makeZkid(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}${p(date.getHours())}${p(date.getMinutes())}`;
}

function workflow(bpiPath, publishDate) {
  const zkid = makeZkid();
  const ctx = {
    bpiPath: path.resolve(bpiPath),
    publishDate,
    repoRoot: REPO_ROOT,
    zkid,
    workdir: path.join(WORKFLOW_DIR, 'workdir', zkid),
  };
  console.log(`[workflow] instance id (zkid): ${zkid}`);

  let currentStep = 'validate-bpi';
  let lockHeld = false;
  try {
    while (currentStep !== null) {
      if (currentStep === 'verify-master') {
        acquireGitLock(zkid);
        lockHeld = true;
      }
      console.log(`[workflow] step: ${currentStep}`);
      const result = steps[currentStep](ctx);
      if (!result.success) fail('workflow', `step ${currentStep} failed`);
      currentStep = nextStep[currentStep];
    }
  } catch (e) {
    if (e instanceof WorkflowError) {
      console.error(`[${e.stage}] ERROR: ${e.message}`);
      process.exitCode = 1;
    } else {
      throw e;
    }
  } finally {
    if (lockHeld) {
      if (process.exitCode) {
        // failed mid-section: best-effort restore before releasing
        spawnSync('git', ['checkout', 'master'], { stdio: 'inherit', cwd: ctx.repoRoot });
      }
      releaseGitLock(zkid);
    }
  }
  if (process.exitCode) return;
  console.log('[workflow] pipeline completed successfully.');
}

module.exports = { acquireGitLock, releaseGitLock, makeZkid, GIT_LOCK_PATH };

if (require.main === module) {
  const [bpiPath, publishDate] = process.argv.slice(2);
  if (!bpiPath || !publishDate) {
    console.error('Usage: node bpi-to-blog-post-workflow.js <path-to-bpi.md> <publish-date YYYY-MM-DD>');
    process.exit(1);
  }
  workflow(bpiPath, publishDate);
}
