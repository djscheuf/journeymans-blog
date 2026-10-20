#!/usr/bin/env node
/**
 * Step 7: Schema validation — Deterministic
 *
 * Validates the working post.json after the agentic steps, before post
 * generation. Checks required fields, types, and value constraints.
 *
 * Usage: node 07-validate-schema.js [workdir]
 *
 * Exit 0 on success (warnings allowed); exit 1 on validation errors.
 */

const fs = require("fs");
const path = require("path");

function validateSchema(workdir = "workdir", agenticFields = null) {
  const jsonPath = path.join(path.resolve(workdir), "post.json");

  const errors = [];
  const warnings = [];

  if (!fs.existsSync(jsonPath)) {
    return { ok: false, errors: [`file not found: ${jsonPath}`], warnings };
  }

  let doc;
  try {
    doc = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  } catch (e) {
    return { ok: false, errors: [`invalid JSON: ${e.message}`], warnings };
  }

  function req(field, check, msg) {
  if (!(field in doc)) {
    errors.push(`missing required field: ${field}`);
    return;
  }
  if (check && !check(doc[field])) errors.push(msg || `invalid ${field}`);
}

req("source_path", (v) => typeof v === "string" && fs.existsSync(v),
  `source_path does not exist on disk: ${doc.source_path}`);
req("title", (v) => typeof v === "string" && v.trim().length > 0);
req("slug", (v) => typeof v === "string" && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v),
  `slug must be kebab-case: ${doc.slug}`);
req("publish_date", (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v),
  `publish_date must be YYYY-MM-DD: ${doc.publish_date}`);
req("word_count", (v) => Number.isInteger(v) && v > 0);
req("reading_time_min", (v) => typeof v === "number" && v > 0);
// Fields owned by agentic steps are only required once the owning step has
// run. agenticFields === null means "full check" (step 7); otherwise it is
// the array of fields the current step owns.
const need = (f) => agenticFields === null || agenticFields.includes(f);

if (need("category"))
  req("category", (v) => ["Leadership", "Engineering", "Software"].includes(v),
    `category must be Leadership, Engineering, or Software: ${doc.category}`);
if (need("tags"))
  req("tags", (v) => Array.isArray(v) && v.length === 3 && v.every((t) => typeof t === "string" && t.length > 0),
    `tags must be an array of exactly 3 non-empty strings`);
if (need("image"))
  req("image", (v) => typeof v === "string" && v.startsWith("/img/post_img/"),
    `image must be a /img/post_img/ path: ${doc.image}`);
req("hemingway_content", (v) => typeof v === "string" && v.trim().length > 0);

// Cross-checks and soft warnings
if (typeof doc.image_confidence === "number" && doc.image_confidence < 0.5) {
  warnings.push(`image_confidence ${doc.image_confidence} < 0.5 — image selection needs human confirmation`);
}
if (doc.tags && doc.tags.length !== new Set(doc.tags).size) {
  errors.push("tags contain duplicates");
}
if (!("description" in doc)) {
  warnings.push("no description field — step 8 will fall back to first sentence of Hemingway content");
}
if (doc.word_count && doc.hemingway_content) {
  const actual = doc.hemingway_content.split(/\s+/).filter(Boolean).length;
  if (Math.abs(actual - doc.word_count) > Math.max(5, actual * 0.05)) {
    warnings.push(`word_count ${doc.word_count} differs from actual ${actual}`);
  }
}

  return { ok: errors.length === 0, errors, warnings, doc };
}

if (require.main === module) {
  const out = validateSchema(process.argv[2]);
  delete out.doc;
  console.log(JSON.stringify(out));
  if (!out.ok || out.warnings.length) console.error(JSON.stringify(out, null, 2));
  process.exit(out.ok ? 0 : 1);
}

module.exports = { validateSchema };
