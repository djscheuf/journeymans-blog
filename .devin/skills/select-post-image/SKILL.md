---
description: Agentic pipeline step — select the best header image for a blog post from the indexed image library; updates the `image` field in the working post.json
---

# Select Post Image

Bounded agentic task in the BPI → blog post pipeline. This is a semantic
match against a fixed image index — a cheap (Haiku-class) model is
sufficient.

## Inputs

- `workdir/post.json` — working document.
  Reads: `title`, `hemingway_content`, `tags`, `category` (if set).
- `{repo_root}/source/img/post_img/image-index.json` — image index with
  per-image `themes`, `concepts`, `mood`, `use_cases` metadata.

**Important:** the image index is read-only for this step. Do not modify,
re-index, or append to `image-index.json` — selection only.

## Task

1. **Extract post characteristics** from the title + Hemingway content:
   main themes (3–5), key concepts, emotional tone/mood, use-case context.
2. **Score each image** in the index:

   ```
   Theme Match (40%):  |post_themes ∩ image_themes|     / max(|post_themes|, |image_themes|)
   Concept Match(40%): |post_concepts ∩ image_concepts| / max(|post_concepts|, |image_concepts|)
   Mood Align   (15%): 1.0 if any mood matches, else 0.0
   Use Case     ( 5%): |post_use_cases ∩ image_use_cases| / max(|post_use_cases|, |image_use_cases|)

   score = 0.40*Theme + 0.40*Concept + 0.15*Mood + 0.05*UseCase
   ```

3. **Select** the highest-scoring image.

## Output

Update `post.json` in place:

- `image` — selected image path (e.g., `/img/post_img/agile_team.png`)
- `image_confidence` — the computed score (0–1)
- `image_alternatives` — up to 2 runner-up image paths
- `image_rationale` — brief reasoning (themes/concepts matched)

If `image_confidence` < 0.5, still populate all fields but the pipeline
should flag the post for human confirmation rather than auto-accepting.

This step must change **only** those properties.
