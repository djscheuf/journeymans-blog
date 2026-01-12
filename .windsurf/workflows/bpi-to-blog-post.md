---
description: Convert BPI document Hemingway section to blog post
---

# Convert BPI Document to Blog Post

This workflow converts a BPI (Blog Post Idea) document's Hemingway section into a properly formatted blog post in the journeymans-blog repository.

## Prerequisites

- BPI document path (from zweite-fundament repository)
- The BPI document must have a "Hemingway'd" or "Hemingway" section

## Workflow Steps

### 1. Read the BPI Document

Read the provided BPI document and locate the Hemingway section (typically marked as `## Hemingway'd` or `## Hemingway`).

Extract:
- The Hemingway section content (everything from the heading until the next `##` heading)
- Any context from the Core Idea or Pitch sections that might help with title generation

### 2. Generate Proposed Title

Based on the Hemingway section content, create a 3-5 word title that:
- Captures the core insight or theme
- Is compelling and clear
- Uses Title Case formatting
- Will work well as a kebab-case filename

**Example titles from existing posts:**
- "Ratios of Work"
- "AI Won't Transform Your Business"
- "Demo as Test"
- "Leading with Silence"

### 3. Create the Blog Post File

Create a new file in `/source/_posts/` with:
- Filename: `[kebab-case-title].md`
- Example: `ratios-of-work.md`

### 4. Determine the Category

Review the content against `/docs/CATEGORIES.md` to select ONE category from: **Leadership**, **Engineering**, or **Software**.

Use the decision framework from the categories document:
1. What is the primary audience? (Leaders/Managers, Engineers/Developers, or Business/Technology Leaders)
2. What is the main takeaway? (How to lead people, how to build software, or how software fits business strategy)
3. What domain does the solution live in? (People/organizational systems, technical practices, or business strategy)

Refer to the category definitions and examples in `/docs/CATEGORIES.md` for detailed guidance.

### 5. Select 3 Tags

Review `/docs/TAGS.md` for the approved tag list and `/docs/prompts/TAG_SELECTION_PROMPT.md` for selection guidance.

Select 3 tags that:
- Represent core themes of the content
- Help readers discover related content
- Provide variety (not all similar)
- Connect to existing content clusters

Refer to the approved tags and their definitions in `/docs/TAGS.md`.

### 6. Create Description/Teaser

Write a 1-2 sentence description that:
- Captures the core insight or value proposition
- Works well in post previews and RSS feeds
- Is concise and compelling
- Summarizes what the reader will learn

### 7. Ask for Publication Date

Ask the user: "When should this post be published? (Provide date in YYYY-MM-DD format)"

Once received, format the date as: `YYYY-MM-DD 09:30:00`

All posts are published at 9:30 AM Central Time.

### 8. Calculate Word Count and Reading Time

// turbo
Run the word count script to calculate statistics for the Hemingway content:

```bash
node scripts/calculate-reading-stats.js "[Hemingway content as string]"
```

The script will output:
- Estimated word count (rounded to nearest 10)
- Estimated reading time (rounded to nearest 0.5 minutes)

Format for prepending to content:
```
~[word count] Words | ~[reading time]min Read

```

Example output: `~820 Words | ~3.5min Read`

### 9. Create the Blog Post with Front Matter

Create the file with this structure:

```markdown
---
title: [Title in Title Case]
categories:
  - [Selected Category]
tags:
  - [tag-1]
  - [tag-2]
  - [tag-3]
date: YYYY-MM-DD 09:30:00
description: [1-2 sentence teaser]
---

~[word count] Words | ~[reading time]min Read

[Exact content from Hemingway section, word for word]
```

**Important:** 
- Copy the Hemingway section content EXACTLY as written
- Do not modify, edit, or "improve" the content
- Preserve all formatting, line breaks, and markdown

### 10. Create Git Branch

// turbo
Create a new git branch:

```bash
git checkout -b post/[kebab-case-title]
```

### 11. Stage and Commit the New Post

// turbo
Stage and commit the new blog post file:

```bash
git add source/_posts/[kebab-case-title].md
git commit -m "Add blog post: [Title]"
```

### 12. Confirm Completion

Inform the user:
- ✅ Blog post created: `source/_posts/[filename].md`
- ✅ Branch created: `post/[title]`
- ✅ File committed
- Next steps: Review the post, make any edits, and push the branch when ready

## Example Execution

**Input BPI:** `202503192123 - BPI - Ratios of Work.md`

**Steps:**
1. Read Hemingway section (lines 46-131)
2. Propose title: "Ratios of Work"
3. Create file: `ratios-of-work.md`
4. Determine category: **Leadership** (focuses on organizational patterns and strategic decisions)
5. Select tags: `organizations`, `effectiveness`, `process`
6. Create description: "Understanding the four types of work and how their distribution reveals the health of your technology strategy."
7. Ask for date: User provides "2025-04-15"
8. Create post with date: "2025-04-15 09:30:00"
9. Create branch: `post/ratios-of-work`
10. Commit: "Add blog post: Ratios of Work"

## Notes

- The workflow operates across two repositories: zweite-fundament (source) and journeymans-blog (destination)
- Always preserve the exact Hemingway content - no edits
- The BPI document may contain wiki-links like `[[Link]]` - these should be preserved in the blog post content
- If the Hemingway section references other sections (like with links), that's fine - copy it as-is
- The user may want to edit the post after creation to handle wiki-links or add images

## Troubleshooting

**Issue:** Can't find Hemingway section
- Look for variations: "Hemingway'd", "Hemingway", "Hemingway'd Draft"
- Check if the section is under a different heading

**Issue:** Content has wiki-links `[[Link]]`
- Preserve them as-is in the initial creation
- User can convert them to proper markdown links during review

**Issue:** Unclear which category to use
- Default to the primary audience: Leaders → Leadership, Engineers → Engineering, Business/Tech Leaders → Software
- Ask the user if truly ambiguous
