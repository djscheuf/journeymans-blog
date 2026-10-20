#!/usr/bin/env node
/**
 * Step 8: Generate blog post file — Deterministic
 *
 * Template substitution: renders the working post.json into a Hexo blog
 * post markdown file following docs/BLOG_POST_STRUCTURE.md and the
 * conventions in .devin/skills/bpi-to-blog-post.
 *
 * Usage: node 08-generate-post.js [workdir] [posts-dir]
 *
 *   [workdir]    directory containing post.json; default ./workdir
 *   [posts-dir]  output dir; default {repo_root}/source/_posts
 *
 * Output file: <posts-dir>/<slug>.md
 */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../..");

function generatePost(workdir = "workdir", postsDir = path.join(repoRoot, "source/_posts")) {
  workdir = path.resolve(workdir);
  postsDir = path.resolve(postsDir);

  const jsonPath = path.join(workdir, "post.json");
  if (!fs.existsSync(jsonPath)) throw new Error(`file not found: ${jsonPath}`);
  const doc = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  for (const f of ["title", "slug", "publish_date", "word_count", "reading_time_min", "category", "tags", "image", "hemingway_content"]) {
    if (!(f in doc)) throw new Error(`missing required field: ${f} (run 07-validate-schema.js first)`);
  }

  // Reading stats per skill convention: word count rounded to nearest 10,
  // reading time to nearest 0.5
  const roundedWords = Math.round(doc.word_count / 10) * 10;
  const roundedMinutes = Math.round(doc.reading_time_min * 2) / 2;
  const statsLine = `~${roundedWords} Words | ~${roundedMinutes}min Read`;

  // Description: use explicit field, else first sentence of Hemingway content
  let description = doc.description;
  if (!description) {
    const m = doc.hemingway_content.trim().match(/^(.+?[.!?])(\s|$)/s);
    description = m ? m[1] : doc.hemingway_content.trim().split("\n")[0].slice(0, 160);
    console.error(`warning: no description — using first sentence of content`);
  }
  if (/[:#]/.test(description)) description = `"${description.replace(/"/g, '\\"')}"`;

  const date = `${doc.publish_date} 09:30:00`; // all posts publish 9:30 AM Central

  const tagsYaml = doc.tags.map((t) => `  - ${t}`).join("\n");
  const photosYaml = `  - ${doc.image.replace(/^\//, "")}`; // strip leading slash, matches existing posts

  const post = `---
title: ${doc.title}
categories:
  - ${doc.category}
tags:
${tagsYaml}
date: ${date}
photos:
${photosYaml}
description: ${description}
---

${statsLine}

${doc.hemingway_content}
`;

  fs.mkdirSync(postsDir, { recursive: true });
  const outPath = path.join(postsDir, `${doc.slug}.md`);
  if (fs.existsSync(outPath)) throw new Error(`post file already exists, refusing to overwrite: ${outPath}`);
  fs.writeFileSync(outPath, post);

  return { ok: true, output: outPath };
}

if (require.main === module) {
  try {
    console.log(JSON.stringify(generatePost(process.argv[2], process.argv[3])));
  } catch (e) {
    console.error(JSON.stringify({ ok: false, error: e.message }));
    process.exit(1);
  }
}

module.exports = { generatePost };
