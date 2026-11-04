/**
 * Shared helpers for the optional "Further Reading" feature — Deterministic.
 *
 * BPI authoring format (a section in the BPI note; ends at the next `## ` heading):
 *
 *   ## Further Reading
 *   - [The Effective Executive](https://www.amazon.com/dp/0060833459) — optional "why read" note
 *   - [Another Post On This Blog](/blog/some-slug/)
 *   - [Theory of Constraints](https://en.wikipedia.org/wiki/Theory_of_constraints)
 *
 * post.json shape (all fields beyond title/url are filled by 07b-fetch-link-assets):
 *
 *   further_reading: [{ title, url, note?, type: 'book'|'post'|'link', cover?, image? }]
 *     cover — book cover filename inside source/img/covers/
 *     image — site-relative header image path of an internal post (img/post_img/x.jpg)
 */

const MAX_ITEMS = 5; // "a small handful" — more than this is a warning
const TYPES = ['book', 'post', 'link'];

// "## Further Reading" section body (heading excluded), or null if absent.
function extractSection(content) {
  const m = content.match(/^##\s+Further Reading\s*$/im);
  if (!m) return null;
  const rest = content.slice(m.index + m[0].length);
  const next = rest.search(/^##\s/m);
  const body = next === -1 ? rest : rest.slice(0, next);
  // a trailing horizontal rule belongs to the document layout, not the list
  return body.replace(/^---\s*$/gm, '').trim();
}

// Parse list items of the form `- [Title](url) — optional note`.
// Anything else in the section is an error: a silent skip would drop links.
function parseFurtherReading(content) {
  const body = extractSection(content);
  if (body === null || body === '') return [];

  const items = [];
  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const m = line.match(/^[-*]\s+\[([^\]]+)\]\(([^)\s]+)\)\s*(?:[—–:-]\s*)?(.*)$/);
    if (!m) {
      throw new Error(
        `Further Reading: cannot parse line (expected "- [Title](url) — optional note"): ${line}`
      );
    }
    const [, title, url, note] = m;
    const item = { title: title.trim(), url };
    if (note.trim()) item.note = note.trim();
    items.push(item);
  }
  return items;
}

const AMAZON_HOST = /(^|\.)amazon\.[a-z.]+$/i;
// /dp/ASIN, /gp/product/ASIN, /o/asin/ASIN (ASIN of a book = its ISBN-10)
const AMAZON_ASIN = /\/(?:dp|gp\/product|o\/asin|exec\/obidos\/asin)\/([0-9A-Z]{10})(?:[/?#]|$)/;

function isInternal(url) {
  return /^\/blog\/[^/]+\/?$/.test(url);
}

function amazonAsin(url) {
  try {
    const u = new URL(url);
    if (!AMAZON_HOST.test(u.hostname)) return null;
    const m = u.pathname.match(AMAZON_ASIN);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

// Internal post slug from /blog/<slug>/
function internalSlug(url) {
  const m = url.match(/^\/blog\/([^/]+)\/?$/);
  return m ? m[1] : null;
}

function classify(url) {
  if (isInternal(url)) return 'post';
  if (amazonAsin(url)) return 'book';
  return 'link';
}

function validateFurtherReading(list) {
  const errors = [];
  const warnings = [];
  if (!Array.isArray(list)) return { errors: ['further_reading must be an array'], warnings };
  if (list.length > MAX_ITEMS) {
    warnings.push(`further_reading has ${list.length} items; a small handful (<= ${MAX_ITEMS}) reads best`);
  }
  list.forEach((it, i) => {
    const at = `further_reading[${i}]`;
    if (!it || typeof it !== 'object') return errors.push(`${at} must be an object`);
    if (typeof it.title !== 'string' || !it.title.trim()) errors.push(`${at}.title is required`);
    if (typeof it.url !== 'string' || !(/^https?:\/\/\S+$/.test(it.url) || isInternal(it.url))) {
      errors.push(`${at}.url must be http(s):// or an internal /blog/<slug>/ path: ${it.url}`);
    }
    if ('note' in it && typeof it.note !== 'string') errors.push(`${at}.note must be a string`);
    if ('type' in it && !TYPES.includes(it.type)) errors.push(`${at}.type must be one of ${TYPES.join(', ')}`);
    for (const f of ['cover', 'image']) {
      if (f in it && typeof it[f] !== 'string') errors.push(`${at}.${f} must be a string`);
    }
  });
  return { errors, warnings };
}

module.exports = {
  MAX_ITEMS,
  TYPES,
  extractSection,
  parseFurtherReading,
  classify,
  amazonAsin,
  internalSlug,
  validateFurtherReading,
};
