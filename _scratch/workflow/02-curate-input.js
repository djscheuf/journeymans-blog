#!/usr/bin/env node
/**
 * Step 2: Input curation / content prep — Deterministic
 *
 * Extracts title, Hemingway section content, and publish date; computes
 * word count and reading time; writes a working JSON document to the
 * working directory.
 *
 * Usage:
 *   node 02-curate-input.js <path-to-bpi.md> <publish-date> [workdir]
 *
 *   <path-to-bpi.md>  BPI file (assumed already validated by step 1,
 *                     but this script re-validates defensively)
 *   <publish-date>    target publish date, e.g. 2026-11-01
 *   [workdir]         output directory; defaults to ./workdir
 *
 * Output: <workdir>/post.json  (path printed to stdout on success)
 */

const fs = require("fs");
const path = require("path");

const FILENAME_RE = /^(\d{12}) - BPI - (.+)\.md$/;
const WORDS_PER_MINUTE = 200;

function fail(msg) {
  console.error(JSON.stringify({ ok: false, error: msg }));
  process.exit(1);
}

function curateInput(bpiPath, publishDate, workdir = "workdir") {
  if (!bpiPath || !publishDate) {
    throw new Error("bpiPath and publishDate are required");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishDate)) {
    throw new Error(`publish date must be YYYY-MM-DD: ${publishDate}`);
  }

  const resolved = path.resolve(bpiPath);
  if (!fs.existsSync(resolved)) throw new Error(`file not found: ${resolved}`);

  const basename = path.basename(resolved);
  const match = basename.match(FILENAME_RE);
  if (!match) throw new Error(`filename does not match convention: ${basename}`);
  const [, datestamp, title] = match;

  const content = fs.readFileSync(resolved, "utf8");

  // Extract the Hemingway section: from its heading to the next ## heading or EOF
  const headingMatch = content.match(/^##\s+Hemingway'?d?\s*$/im);
  if (!headingMatch) throw new Error("no Hemingway section found");

  const rest = content.slice(headingMatch.index + headingMatch[0].length);
  const nextHeading = rest.search(/^##\s/m);
  const sectionBody = nextHeading === -1 ? rest : rest.slice(0, nextHeading);

  const hemingwayContent = sectionBody
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (!hemingwayContent) throw new Error("Hemingway section is empty");

  const wordCount = hemingwayContent.split(/\s+/).filter(Boolean).length;
  const readingTimeMin = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

  // Derive a slug from the title for later steps
  const slug = title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const doc = {
    source_path: resolved,
    source_datestamp: datestamp,
    title,
    slug,
    publish_date: publishDate,
    word_count: wordCount,
    reading_time_min: readingTimeMin,
    hemingway_content: hemingwayContent,
  };

  const outDir = path.resolve(workdir);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "post.json");
  fs.writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n");

  return { ok: true, output: outPath, word_count: wordCount, reading_time_min: readingTimeMin, slug };
}

if (require.main === module) {
  try {
    const [bpiPath, publishDate, workdir] = process.argv.slice(2);
    console.log(JSON.stringify(curateInput(bpiPath, publishDate, workdir)));
  } catch (e) {
    fail(e.message);
  }
}

module.exports = { curateInput };
