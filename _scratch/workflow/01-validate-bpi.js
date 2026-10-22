#!/usr/bin/env node
/**
 * Step 1: Validate BPI input file — Deterministic
 *
 * Checks:
 *  - file exists and is readable
 *  - filename conforms to "{YYYYMMDDHHmm} - BPI - {title}.md"
 *  - file contains a Hemingway section (## Hemingway or ## Hemingway'd)
 *
 * Usage: node 01-validate-bpi.js <path-to-bpi.md>
 * Exit: 0 on success; 1 with error message on failure.
 * On success, prints a JSON summary to stdout.
 */

const fs = require("fs");
const path = require("path");

const FILENAME_RE = /^(\d{12}) - BPI - (.+)\.md$/;

function fail(msg) {
  console.error(JSON.stringify({ ok: false, error: msg }));
  process.exit(1);
}

function validateBpi(bpiPath) {
  if (!bpiPath) throw new Error("bpiPath is required");

  const resolved = path.resolve(bpiPath);
  if (!fs.existsSync(resolved)) throw new Error(`file not found: ${resolved}`);

  const stat = fs.statSync(resolved);
  if (!stat.isFile()) throw new Error(`not a file: ${resolved}`);

  try {
    fs.accessSync(resolved, fs.constants.R_OK);
  } catch {
    throw new Error(`file not readable: ${resolved}`);
  }

  const basename = path.basename(resolved);
  const match = basename.match(FILENAME_RE);
  if (!match) {
    throw new Error(
      `filename does not match convention "{YYYYMMDDHHmm} - BPI - {title}.md": ${basename}`
    );
  }

  const [, datestamp, title] = match;

  // Validate the datestamp is a plausible date (YYYYMMDDHHmm)
  const year = +datestamp.slice(0, 4);
  const month = +datestamp.slice(4, 6);
  const day = +datestamp.slice(6, 8);
  const hour = +datestamp.slice(8, 10);
  const minute = +datestamp.slice(10, 12);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) {
    throw new Error(`invalid datestamp in filename: ${datestamp}`);
  }

  const content = fs.readFileSync(resolved, "utf8");
  const hemingwayMatch = content.match(/^##\s+Hemingway'?d?\s*$/im);
  if (!hemingwayMatch) throw new Error("no Hemingway section found (expected '## Hemingway' or \"## Hemingway'd\")");

  return {
    ok: true,
    path: resolved,
    datestamp,
    title,
    hemingway_heading: hemingwayMatch[0].trim(),
  };
}

if (require.main === module) {
  try {
    console.log(JSON.stringify(validateBpi(process.argv[2])));
  } catch (e) {
    fail(e.message);
  }
}

module.exports = { validateBpi };
