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
 *   further_reading: [{ title, url, note?, type: 'book'|'post'|'link', cover?, image?,
 *                       source_url?, affiliate? }]
 *     url        — for Amazon items: the affiliate URL (or the plain canonical URL if no tag is set)
 *     source_url — the link exactly as the author wrote it (kept when `url` is rewritten)
 *     affiliate  — true only when `url` carries the Associates tag
 *     cover — book cover filename inside source/img/covers/ (see coverSlug)
 *     image — site-relative header image path of an internal post (img/post_img/x.jpg)
 */

const MAX_ITEMS = 5; // "a small handful" — extras are dropped (with a WARN) when the BPI is read
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
// Returns { items, dropped, warnings }:
//   items    the first MAX_ITEMS entries, in the author's order
//   dropped  entries beyond the cap (the author is trusted to trim; we only WARN)
//   warnings WARN strings
// `- [[Wikilink]]` lines are skipped with a WARN (the author repairs them) and do not count
// toward the cap. Any other unparseable line is an error: a silent skip would drop links.
function parseFurtherReading(content) {
  const body = extractSection(content);
  const warnings = [];
  if (body === null || body === '') return { items: [], dropped: [], warnings };

  const all = [];
  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const wiki = line.match(/^[-*]\s+\[\[([^\]]+)\]\]/);
    if (wiki) {
      warnings.push(
        `Further Reading: skipped wikilink line [[${wiki[1]}]] — replace it with "- [Title](url)" to include it`
      );
      continue;
    }
    const m = line.match(/^[-*]\s+\[([^\]]+)\]\(([^)\s]+)\)\s*(?:[—–:-]\s*)?(.*)$/);
    if (!m) {
      throw new Error(
        `Further Reading: cannot parse line (expected "- [Title](url) — optional note"): ${line}`
      );
    }
    const [, title, url, note] = m;
    const item = { title: title.trim(), url };
    if (note.trim()) item.note = note.trim();
    all.push(item);
  }

  const items = all.slice(0, MAX_ITEMS);
  const dropped = all.slice(MAX_ITEMS);
  if (dropped.length) {
    warnings.push(
      `Further Reading: ${dropped.length} more than the cap of ${MAX_ITEMS}; using the first ${MAX_ITEMS}, dropped: ` +
        dropped.map((d) => `"${d.title}"`).join(', ')
    );
  }
  return { items, dropped, warnings };
}

// Real Amazon storefronts only. A suffix pattern like /amazon\.[a-z.]+$/ would also accept
// look-alikes such as amazon.evil.example, and we attach an affiliate tag to whatever matches.
const AMAZON_HOST =
  /^(?:www\.|smile\.|m\.)?amazon\.(?:com|ca|co\.uk|de|fr|it|es|nl|se|pl|in|sg|ae|sa|eg|com\.au|com\.br|com\.mx|com\.tr|com\.be|co\.jp)$/i;
// Short links hide the ASIN behind a redirect; we do not follow redirects in the workflow.
const AMAZON_SHORT_HOST = /^(?:amzn\.to|amzn\.eu|amzn\.asia|a\.co)$/i;
// /dp/ASIN, /gp/product/ASIN, /product/ASIN, /o/ASIN, /exec/obidos/ASIN (+ slug-prefixed forms).
// The ASIN of a book is its ISBN-10.
const AMAZON_ASIN =
  /\/(?:dp|gp\/product|gp\/aw\/d|product|o\/asin|exec\/obidos\/asin)\/([0-9A-Z]{10})(?=[/?#]|$)/i;

const AFFILIATE_TAG = /^[a-z0-9][a-z0-9-]*-\d{2}$/;

function isInternal(url) {
  return /^\/blog\/[^/]+\/?$/.test(url);
}

function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function amazonAsin(url) {
  try {
    const u = new URL(url);
    if (!AMAZON_HOST.test(u.hostname)) return null;
    const m = u.pathname.match(AMAZON_ASIN);
    return m ? m[1].toUpperCase() : null;
  } catch {
    return null;
  }
}

function isAmazonShortLink(url) {
  const h = hostOf(url);
  return !!h && AMAZON_SHORT_HOST.test(h);
}

function validateAffiliateTag(tag) {
  return typeof tag === 'string' && AFFILIATE_TAG.test(tag);
}

// Canonical Amazon URL for an item. With a tag: https://www.amazon.com/dp/<ASIN>/ref=nosim?tag=<tag>
// (Amazon's documented simple text-link format). Without a tag: https://www.amazon.com/dp/<ASIN>.
// All other path segments and query parameters (including any foreign tag) are dropped.
// URLs that are not Amazon product links are returned unchanged; short links are rejected.
function affiliateUrl(url, tag) {
  if (isAmazonShortLink(url)) {
    throw new Error(
      `short Amazon link cannot be resolved (${url}) — paste the full product URL (amazon.com/.../dp/<ASIN>) instead`
    );
  }
  const asin = amazonAsin(url);
  if (!asin) return url;
  if (!tag) return `https://www.amazon.com/dp/${asin}`;
  if (!validateAffiliateTag(tag)) throw new Error(`invalid Amazon affiliate tag: ${JSON.stringify(tag)}`);
  return `https://www.amazon.com/dp/${asin}/ref=nosim?tag=${tag}`;
}

// Short cover filename stem: cut at the first ":" (drops the subtitle), slugify, keep 4 words.
function coverSlug(title) {
  return title
    .split(':')[0]
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 4)
    .join('-');
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
    if ('source_url' in it && typeof it.source_url !== 'string') errors.push(`${at}.source_url must be a string`);
    if ('affiliate' in it && typeof it.affiliate !== 'boolean') errors.push(`${at}.affiliate must be a boolean`);
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
  isAmazonShortLink,
  affiliateUrl,
  validateAffiliateTag,
  coverSlug,
  internalSlug,
  validateFurtherReading,
};
