# Blog Post Consolidation Script

## Overview
This script consolidates all Hexo blog posts from `source/_posts` into a single PDF document.

## Features
- ✅ Extracts YAML front matter (title, date, photos, categories, tags)
- ✅ Supports both remote images (HTTP/HTTPS) and local images from `source/img/post_img`
- ✅ Converts markdown to formatted text with proper styling
- ✅ **Clickable links** - All markdown links `[text](url)` are rendered as clickable hyperlinks in the PDF
- ✅ Proper formatting for headings, lists, code blocks, and blockquotes
- ✅ Posts sorted by date (newest first)
- ✅ Professional cover page with metadata

## Usage

### Generate PDF
```bash
npm run consolidate-pdf
```

This will create `consolidated_blog_posts.pdf` in the project root directory.

## Output
The generated PDF includes:
1. **Cover page** with blog title, generation date, and total post count
2. **Individual posts** with:
   - Post title (large, bold)
   - Publication date
   - Featured image (centered, if available)
   - Full post content with clickable links

## Technical Details

### Dependencies
- `pdfkit` - PDF generation
- `js-yaml` - YAML front matter parsing
- `marked` - Markdown parsing
- `axios` - Image downloading

### Link Handling
Markdown links like `[Click here](https://example.com)` are automatically converted to clickable hyperlinks in the PDF. Links appear in blue with underlines.

**Internal Blog Links**: Relative links to other blog posts (e.g., `/blog/post-name/`) are automatically converted to absolute URLs (`https://daniel.scheufler.tech/blog/post-name/`) so they work correctly when clicked in the PDF.

### Image Handling
The script handles both:
- **Remote images**: Downloaded from HTTP/HTTPS URLs
- **Local images**: Loaded from `source/img/post_img/` directory

Images are automatically scaled to fit within the page margins while maintaining aspect ratio.

## Troubleshooting

### Missing Images
If you see warnings like "Local image not found", check:
1. The image path in the post's front matter
2. The actual filename in `source/img/post_img/` (case-sensitive, check file extension)

### Link Issues
Links must be in standard markdown format: `[text](url)`
- Relative links work (e.g., `[About](/about)`)
- Absolute URLs work (e.g., `[Google](https://google.com)`)
