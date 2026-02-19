---
description: Convert published blog post to MailerLite newsletter draft campaign
---

# Blog Post to Newsletter Campaign

This workflow converts a published blog post into a MailerLite newsletter draft campaign, ready for review and scheduling.

## Prerequisites

- Published blog post file path (from `source/_posts/`)
- MailerLite API key set in environment: `MAILERLITE_API_KEY`
- `mailerlite-email` skill for HTML conversion guidance

## Workflow Steps

### 1. Read the Published Blog Post

Read the provided blog post file and extract:
- Front matter metadata (title, description, date, categories, tags)
- Content body (Markdown)
- Any reading stats line (e.g., `~450 Words | ~2min Read`)

### 2. Generate Newsletter Subject Line

Based on the blog post title and content, create a compelling newsletter subject line that:
- Is 50-60 characters (ideal for email clients)
- Asks a question or makes a bold statement
- May include relevant emoji (e.g., 🚅 ⚖️ 💡)
- Captures the core insight or value proposition
- Is authentic, not clickbait

**Examples from existing campaigns:**
- "How do you build Engineering🚅 Judgement⚖️?"
- "Don't miss the simple tool to train Engineering🚅 Judgement⚖️!"

**Present the proposed subject line to the user for approval or modification.**

### 3. Convert Markdown to Email HTML

Using the `mailerlite-email` skill for guidance, convert the blog post Markdown to email-friendly HTML:

**Content Adaptations:**
1. Remove or adapt the reading stats line (`~XXX Words | ~Xmin Read`)
2. Convert relative links to absolute URLs (e.g., `/blog/post/` → `https://daniel.scheufler.tech/blog/post/`)
3. Ensure all image URLs are absolute
4. Convert wiki-links `[[Link]]` to proper HTML links if present
5. Apply inline CSS styles to all elements

**HTML Conversion Rules:**
- **Headings:** Use H2 for main sections, H3 for subsections
- **Paragraphs:** 16px font, 150% line height, 15px bottom margin
- **Links:** Blue color (#0066CC), underlined
- **Lists:** 20px left margin, 8px item spacing
- **Code blocks:** Monospace font, gray background (#f5f5f5)
- **Font family:** 'Roboto', sans-serif throughout
- **Text color:** #2A2828

**All styles must be inline CSS attributes, not in `<style>` tags.**

### 4. Build Complete Email HTML

Construct the complete email HTML by:

1. Reading the newsletter template: `docs/templates/newsletter-template.html`
2. Locating the content insertion point (main content table)
3. Inserting the converted blog post HTML
4. Ensuring proper table structure and padding (50px horizontal)

**Template Structure:**
- Header: Logo and navigation menu
- Content: Converted blog post (insert here)
- Footer: Unsubscribe link, social links, address

### 5. Create Campaign Name

Generate an internal campaign name using the standard format:
```
YYYYMMDD - Blog Post Title
```

**Format Rules:**
- **YYYYMMDD:** Use the blog post's publication date (from front matter `date` field)
- **Blog Post Title:** Use the exact title from the blog post front matter
- **Separator:** Space-hyphen-space ` - ` between date and title

**Examples from existing campaigns:**
- `20260217 - Drucker Memo Architecture`
- `20260203 - Evolutionary Stages of Metrics`
- `20260120 - Design Buddy`
- `20260106 - Structure Constrains Culture`

**Important:** This name is for internal MailerLite organization only. It does not appear in the email sent to subscribers.

### 6. Build Campaign JSON

Create a JSON payload file for the MailerLite API:

```json
{
  "name": "YYYYMMDD - Blog Post Title",
  "type": "regular",
  "emails": [{
    "from": "daniel@scheufler.tech",
    "from_name": "Next Iteration Newsletter",
    "reply_to": "daniel@scheufler.tech",
    "subject": "Newsletter Subject Line",
    "content": "<html>...</html>"
  }],
  "settings": {
    "track_opens": true
  },
  "language_id": "4"
}
```

Save this to a temporary file: `/tmp/mailerlite-campaign.json`

### 7. Create Draft Campaign via API

// turbo
Use the helper script to create the campaign:

```bash
MAILERLITE_API_KEY="$MAILERLITE_API_KEY" node scripts/mailerlite-api.js create /tmp/mailerlite-campaign.json
```

The script will output:
- Campaign ID
- Status (should be "draft")
- Dashboard URL

### 8. Confirm Completion

Inform the user:
- ✅ Newsletter campaign created: `[Campaign Name]`
- ✅ Status: Draft (ready for review)
- ✅ Dashboard: `https://dashboard.mailerlite.com/campaigns/{campaign_id}`
- 📝 Subject: `[Newsletter Subject Line]`
- 📅 Based on blog post: `[Blog Post Title]`

**Next steps:** Review the campaign in MailerLite dashboard, make any edits, and schedule when ready.

## Example Execution

**Input:** `source/_posts/ai-wont-transform.md`

**Steps:**
1. Read blog post (title: "AI Won't Transform Your Business")
2. Propose subject: "AI won't transform your business... unless 🤔" → User approves
3. Convert Markdown to HTML with inline styles
4. Insert into newsletter template
5. Create campaign name: "20250513 - AI Won't Transform Your Business"
6. Build JSON payload
7. Create campaign via API → Campaign ID: 123456789
8. Confirm: Draft created at dashboard URL

## Notes

- The workflow uses the REST API directly (not MCP) for reliability
- All HTML must have inline CSS for email client compatibility
- The campaign is created as a draft, not scheduled
- User can review and edit in MailerLite dashboard before sending
- The helper script requires `MAILERLITE_API_KEY` environment variable

## Troubleshooting

**Issue:** API key not found
- **Solution:** Ensure `MAILERLITE_API_KEY` is set in environment

**Issue:** Links not working in email
- **Solution:** Verify all URLs are absolute (include `https://`)

**Issue:** Formatting breaks in email preview
- **Solution:** Check that all styles are inline, not in `<style>` tags

**Issue:** Images not displaying
- **Solution:** Ensure image URLs are publicly accessible absolute URLs

**Issue:** Campaign creation fails
- **Solution:** Check the error message, verify JSON payload structure matches API requirements

## Related Files

- **Skill:** `.windsurf/skills/mailerlite-email.md` - Email HTML conversion guidance
- **Template:** `docs/templates/newsletter-template.html` - Newsletter HTML template
- **Helper Script:** `scripts/mailerlite-api.js` - MailerLite API wrapper
- **Requirements:** `docs/reqs/mailerlite-intg/mailerlite-intg.md` - Integration documentation

---

**Last Updated:** 2026-02-19
