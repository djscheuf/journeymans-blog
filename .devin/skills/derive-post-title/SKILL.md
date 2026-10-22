---
description: Agentic pipeline step — derive or improve a blog post title from BPI content; updates the `title` and `slug` fields in the working post.json
---

# Derive Post Title

Bounded agentic task in the BPI → blog post pipeline. Cheap model tier is
sufficient — this is a single focused judgment, not research.

## Inputs

- `workdir/post.json` — working document produced by the curation step.
  Reads: `title`, `hemingway_content`. May also read `source_path` to pull
  the BPI's "Core Idea" or "Pitch" sections for extra context.

## Task

Evaluate the filename-derived `title` against the Hemingway content. If it is
already clear, compelling, and captures the core insight, keep it unchanged.
Otherwise propose a better 3–5 word title that:

- Captures the core insight or theme
- Is compelling and clear
- Uses Title Case
- Works well as a kebab-case filename

**Style reference (existing post titles):**
- "Ratios of Work"
- "AI Won't Transform Your Business"
- "Demo as Test"
- "Leading with Silence"

## Output

Update `post.json` in place:

- `title` — final title (unchanged if the existing one is good)
- `slug` — kebab-case version of the title
- `title_changed` — boolean; true if the agent replaced the original title

This step must change **only** those properties. Do not touch
`hemingway_content` or any other field.
