---
description: Agentic pipeline step — select exactly 3 tags from the approved tag list for a blog post; updates the `tags` field in the working post.json
---

# Select Post Tags

Bounded agentic task in the BPI → blog post pipeline. Cheap model tier is
sufficient — selection from a fixed vocabulary.

## Inputs

- `workdir/post.json` — working document.
  Reads: `title`, `hemingway_content`, `category` (if already set).
- `{repo_root}/docs/TAGS.md` — approved tag list (23 tags, case-sensitive).
- `{repo_root}/docs/prompts/TAG_SELECTION_PROMPT.md` — selection guidance.
  Read both files before deciding.

## Task

Select exactly **3 tags** from the approved list that:

- Represent the core themes of the content
- Help readers discover related content
- Provide variety (not all near-synonyms)
- Connect to existing content clusters

Rules:

- Use exact tag names from TAGS.md (case-sensitive) — never invent tags
- Exactly 3 tags, no more, no fewer

## Output

Update `post.json` in place:

- `tags` — array of exactly 3 approved tag strings
- `tags_rationale` — one sentence per tag explaining the choice (aids eval later)

This step must change **only** those properties.
