# Blog Post Structure & Format Guide

**Purpose:** This document defines the structure, metadata format, and file conventions for blog posts in this Hexo-based blog repository. Use this as a reference when creating, editing, or analyzing blog posts.

---

## File Location & Naming

- **Published posts:** `/source/_posts/[kebab-case-title].md`
- **Naming convention:** Use kebab-case (lowercase with hyphens)
- **File format:** Markdown (.md)

---

## Blog Post Structure

Every blog post consists of two parts:

1. **Front Matter** (YAML metadata block)
2. **Content** (Markdown body)

### Front Matter Format

The front matter is enclosed in `---` delimiters and contains metadata:

```yaml
---
title: [Post Title in Title Case]
categories:
  - [Primary Category]
tags:
  - [tag-1]
  - [tag-2]
  - [tag-3]
date: YYYY-MM-DD HH:mm:ss
photos: 
  - img/post_img/[image-filename.ext]
description: [One-sentence summary that appears in previews and SEO]
---
```

### Required Fields

1. **title** (string)
   - The post's display title
   - Format: Title Case

2. **date** (datetime)
   - Format: `YYYY-MM-DD HH:mm:ss`
   - Timezone: America/Chicago (configured in `_config.yml`)
   - Controls post ordering and publication

3. **tags** (array)
   - **Must use exactly 3 tags** from the approved list
   - See `/docs/TAGS.md` for the complete approved tag list
   - Tags are lowercase with hyphens (e.g., `product-management`)
   - Tags help readers discover related content
   - Refer to `/docs/prompts/TAG_SELECTION_PROMPT.md` for guidance on selecting appropriate tags

4. **description** (string)
   - Short tease or summary of the post
   - Used in post previews, RSS feeds, and SEO meta tags
   - Should capture the core insight or value proposition
   - Typically 1-2 sentences, concise and compelling

### Optional Fields

1. **categories** (array)
   - Broader organizational structure than tags
   - **Use exactly one category** from the approved list
   - See `/docs/CATEGORIES.md` for the complete approved category list and definitions
   - Format: Title Case (e.g., `Leadership`, `Engineering`, `Software`)

2. **photos** (array)
   - Featured image(s) for the post
   - Path relative to site root: `img/post_img/[filename]`
   - Typically one featured image
   - Used in post header and social media previews

---

## Content Body

The content body follows the front matter and is written in standard Markdown format. The blog focuses on leadership, software engineering, and organizational effectiveness.

---

## Markdown Conventions

### Headings
- Use `##` for main sections (H2)
- Use `###` for subsections (H3)
- Avoid using `#` (H1) in content - the title serves as H1

### Links
- Internal links: `/blog/[post-slug]/`
- External links: Full URL with descriptive text
- Use inline links: `[link text](url)`

### Code Blocks
- Use fenced code blocks with language identifiers
- Example: ` ```javascript ` for JavaScript code

### Lists
- Use `-` for unordered lists
- Use `1.` for ordered lists
- Maintain consistent indentation

### Emphasis
- **Bold** for strong emphasis
- *Italic* for mild emphasis or terms

---

## Related Documentation

- **`/docs/CATEGORIES.md`** - Complete approved category list with definitions and selection guidance
- **`/docs/TAGS.md`** - Complete approved tag list with definitions
- **`/docs/prompts/TAG_SELECTION_PROMPT.md`** - Guide for selecting appropriate tags
- **`/scaffolds/post.md`** - Template for new blog posts

---

**Last Updated:** 2026-01-12
