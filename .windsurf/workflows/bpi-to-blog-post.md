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

### 3. Create Initial Blog Post File

**IMPORTANT:** Create the blog post file immediately after generating the title. This ensures we never lose context during the workflow.

Create a new file in `/source/_posts/` with:
- Filename: `[kebab-case-title].md`
- Example: `ratios-of-work.md`

Initial file content should include:
```markdown
---
title: [Proposed Title]
categories:
  - [TBD]
tags:
  - [TBD]
  - [TBD]
  - [TBD]
date: [TBD]
description: [TBD]
---

[Hemingway content will be added after metadata is determined]
```

**All subsequent steps will edit this file incrementally rather than holding everything in memory.**

### 4. Determine the Category and Update File

Review the content against `/docs/CATEGORIES.md` to select ONE category from: **Leadership**, **Engineering**, or **Software**.

Use the decision framework from the categories document:
1. What is the primary audience? (Leaders/Managers, Engineers/Developers, or Business/Technology Leaders)
2. What is the main takeaway? (How to lead people, how to build software, or how software fits business strategy)
3. What domain does the solution live in? (People/organizational systems, technical practices, or business strategy)

Refer to the category definitions and examples in `/docs/CATEGORIES.md` for detailed guidance.

**After determining the category, immediately edit the file to update the `categories` field.**

### 5. Select 3 Tags and Update File

Review `/docs/TAGS.md` for the approved tag list and `/docs/prompts/TAG_SELECTION_PROMPT.md` for selection guidance.

Select 3 tags that:
- Represent core themes of the content
- Help readers discover related content
- Provide variety (not all similar)
- Connect to existing content clusters

Refer to the approved tags and their definitions in `/docs/TAGS.md`.

**After selecting tags, immediately edit the file to update the `tags` field.**

### 6. Create Description/Teaser and Update File

Write a 1-2 sentence description that:
- Captures the core insight or value proposition
- Works well in post previews and RSS feeds
- Is concise and compelling
- Summarizes what the reader will learn

**After creating the description, immediately edit the file to update the `description` field.**

### 7. Ask for Publication Date and Update File

Ask the user: "When should this post be published? (Provide date in YYYY-MM-DD format)"

Once received, format the date as: `YYYY-MM-DD 09:30:00`

All posts are published at 9:30 AM Central Time.

**After receiving the date, immediately edit the file to update the `date` field.**

### 8. Calculate Word Count and Add Content

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

### 9. Add Blog Post Content

**Edit the file to replace the placeholder content with:**

```markdown
~[word count] Words | ~[reading time]min Read

[Exact content from Hemingway section, word for word]
```

**Important:** 
- Copy the Hemingway section content EXACTLY as written
- Do not modify, edit, or "improve" the content
- Preserve all formatting, line breaks, and markdown
- At this point, all front matter fields should be populated and the content should be complete

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
git commit -m "post([kebab-case-title])"
```

**Note:** Commit message format follows the repo convention: `post([kebab-case-title])`

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
3. Create initial file: `ratios-of-work.md` with TBD placeholders
4. Determine category: **Leadership** → Edit file to update category
5. Select tags: `organizations`, `effectiveness`, `process` → Edit file to update tags
6. Create description: "Understanding the four types of work..." → Edit file to update description
7. Ask for date: User provides "2025-04-15" → Edit file to update date to "2025-04-15 09:30:00"
8. Calculate word count and add content → Edit file to add reading stats and Hemingway content
9. Create branch: `post/ratios-of-work`
10. Commit: `post(ratios-of-work)`

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
