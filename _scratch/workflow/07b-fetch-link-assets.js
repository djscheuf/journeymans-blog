#!/usr/bin/env node
/**
 * Step 7b: Fetch Further Reading assets — Deterministic
 *
 * For each item in post.json `further_reading`:
 *   - book (Amazon /dp/<ASIN> link): download the cover into source/img/covers/<title-slug>.jpg
 *       1st choice  https://m.media-amazon.com/images/P/<ASIN>.01.LZZZZZZZ.jpg
 *       fallback    https://covers.openlibrary.org/b/isbn/<ASIN>-L.jpg  (a book ASIN is its ISBN-10)
 *     Existing files are reused, never re-downloaded (idempotent, covers are shared across posts).
 *   - post (/blog/<slug>/): copy the target post's first `photos` entry into `image` (no download).
 *   - link: nothing to fetch; the theme draws a generic link icon.
 *
 * Affiliate links (docs/reqs/recommended-reading Part 7): every Amazon product link gets its
 * ASIN extracted and `url` rewritten to https://www.amazon.com/dp/<ASIN>/ref=nosim?tag=<tag>,
 * where <tag> is env AMAZON_AFFILIATE_TAG. The author's link is kept as `source_url`. With no
 * tag set the item gets the plain canonical URL and a WARN. Short links (amzn.to, a.co) fail.
 *
 * Covers are named by a short title slug (further-reading.js coverSlug), e.g. the-phoenix-project.jpg.
 *
 * Writes `type`, `url`/`source_url`/`affiliate`, and `cover` / `image` where resolved, into post.json.
 * A missing cover or an unknown internal post is a warning, not a failure: the theme
 * falls back to the plain card treatment, and publishing should not hinge on a CDN.
 * Malformed items are errors (caught earlier by 07-validate-schema).
 *
 * Usage: node 07b-fetch-link-assets.js [workdir] [covers-dir]
 *   [workdir]     directory containing post.json; default ./workdir
 *   [covers-dir]  default {repo_root}/source/img/covers
 * Env: AMAZON_AFFILIATE_TAG  Amazon Associates store ID, e.g. name-20 (see .envrc.example)
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  classify,
  amazonAsin,
  affiliateUrl,
  validateAffiliateTag,
  coverSlug,
  internalSlug,
  validateFurtherReading,
} = require('./further-reading');

const repoRoot = path.resolve(__dirname, '../..');
const POSTS_DIR = path.join(repoRoot, 'source/_posts');
const MIN_COVER_BYTES = 2000; // Amazon serves a ~43-byte 1x1 gif when it has no image
const TIMEOUT_MS = 15_000;

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isJpeg(buf) {
  return buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

async function downloadJpeg(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!isJpeg(buf)) throw new Error('response is not a JPEG');
  if (buf.length < MIN_COVER_BYTES) throw new Error(`image too small (${buf.length} bytes)`);
  return buf;
}

async function fetchCover(asin, destPath) {
  const sources = [
    `https://m.media-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`,
    `https://covers.openlibrary.org/b/isbn/${asin}-L.jpg?default=false`,
  ];
  const failures = [];
  for (const src of sources) {
    try {
      const buf = await downloadJpeg(src);
      fs.writeFileSync(destPath, buf);
      return { source: src };
    } catch (e) {
      failures.push(`${new URL(src).hostname}: ${e.message}`);
    }
  }
  throw new Error(failures.join('; '));
}

// First `photos` entry from a post's front matter, or null.
function headerImageOf(slug, postsDir) {
  const file = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const fm = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const m = fm[1].match(/^photos:\s*\r?\n\s*-\s*(\S+)/m);
  return m ? m[1].replace(/^\//, '') : null;
}

async function fetchLinkAssets(
  workdir = 'workdir',
  coversDir = path.join(repoRoot, 'source/img/covers'),
  postsDir = POSTS_DIR,
  { tag = process.env.AMAZON_AFFILIATE_TAG } = {},
) {
  const jsonPath = path.join(path.resolve(workdir), 'post.json');
  if (!fs.existsSync(jsonPath)) throw new Error(`file not found: ${jsonPath}`);
  const doc = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const warnings = [];
  const fetched = [];
  if (!doc.further_reading || doc.further_reading.length === 0) {
    return { ok: true, warnings, fetched, skipped: 'no further_reading' };
  }

  const { errors } = validateFurtherReading(doc.further_reading);
  if (errors.length) throw new Error(`further_reading invalid: ${errors.join('; ')}`);

  tag = (tag || '').trim() || null;
  if (tag && !validateAffiliateTag(tag)) {
    throw new Error(`AMAZON_AFFILIATE_TAG is not a valid Associates ID (expected e.g. name-20): ${JSON.stringify(tag)}`);
  }
  let warnedNoTag = false;

  for (const item of doc.further_reading) {
    // Re-runs start from the author's original link, not an already-rewritten one.
    const original = item.source_url || item.url;
    item.type = classify(original);

    if (item.type !== 'post') {
      const rewritten = affiliateUrl(original, tag); // throws on short links
      if (rewritten !== original) {
        item.source_url = original;
        item.url = rewritten;
      } else {
        item.url = original;
        delete item.source_url;
      }
      item.affiliate = Boolean(tag && amazonAsin(original));
      if (!tag && amazonAsin(original) && !warnedNoTag) {
        warnings.push('AMAZON_AFFILIATE_TAG is not set — Amazon links will be plain, untracked URLs');
        warnedNoTag = true;
      }
    } else {
      item.affiliate = false;
    }

    if (item.type === 'book') {
      const file = `${coverSlug(item.title)}.jpg`;
      const dest = path.join(coversDir, file);
      if (fs.existsSync(dest)) {
        item.cover = file; // reuse
        continue;
      }
      fs.mkdirSync(coversDir, { recursive: true });
      try {
        const { source } = await fetchCover(amazonAsin(original), dest);
        item.cover = file;
        fetched.push({ title: item.title, file, source });
      } catch (e) {
        delete item.cover;
        warnings.push(`no cover for "${item.title}" (${e.message}) — will render as a plain card`);
      }
    } else if (item.type === 'post') {
      const slug = internalSlug(item.url);
      const image = headerImageOf(slug, postsDir);
      if (image) {
        item.image = image;
      } else {
        delete item.image;
        warnings.push(`internal post "${slug}" not found or has no photos — will render as a plain card`);
      }
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(doc, null, 2) + '\n');
  return { ok: true, warnings, fetched };
}

module.exports = { fetchLinkAssets, slugify, headerImageOf };

if (require.main === module) {
  fetchLinkAssets(process.argv[2], process.argv[3])
    .then((r) => console.log(JSON.stringify(r, null, 2)))
    .catch((e) => {
      console.error(JSON.stringify({ ok: false, error: e.message }));
      process.exit(1);
    });
}
