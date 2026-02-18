# Image Description System

This directory contains AI-generated descriptions for blog post images used in the last 3 years.

## Structure

- **Individual `.md` files**: Source of truth for each image description
  - Format: `{image-filename}.md`
  - Contains: Visual Description, Themes, Concepts, Mood, Use Cases
  - Human-editable for refinement

- **`image-index.json`**: Generated searchable index
  - Built from individual `.md` files
  - Used by workflow agents for image selection
  - Regenerate with: `node ../../scripts/build-image-index.js`

## Usage

### For Humans
Edit individual `.md` files to refine descriptions, then rebuild the index.

### For AI Agents
Query `image-index.json` to find relevant images based on:
- Themes (high-level topics)
- Concepts (specific ideas)
- Mood (emotional tone)
- Use cases (application contexts)

## Maintenance

### Adding New Images
1. Create new `.md` file following the existing format
2. Run `node ../../scripts/build-image-index.js` to update index

### Updating Descriptions
1. Edit the relevant `.md` file
2. Run `node ../../scripts/build-image-index.js` to update index

### Regenerating Index
```bash
cd /mnt/data/0_repo/journeymans-blog
node scripts/build-image-index.js
```

## Statistics

- **Total images**: 34 (from posts 2023-02-18 onwards)
- **Most used**: agile_team.png (9 posts), trail-marker.jpg (8 posts), man_think_ai.jpg (7 posts)
- **Generated**: 2026-02-18

## Search Strategy

When selecting images for blog posts, agents should:
1. Extract key themes/concepts from post content
2. Query `image-index.json` for matching themes/concepts
3. Rank matches by relevance
4. Select top match or present options to user
