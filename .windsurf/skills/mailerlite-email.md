---
description: Email HTML conversion and MailerLite newsletter formatting expertise
---

# MailerLite Email Skill

This skill provides just-in-time context for converting blog posts to MailerLite newsletter campaigns.

## Newsletter Configuration

### Sender Information
- **From Email:** `daniel@scheufler.tech`
- **From Name:** `Next Iteration Newsletter`
- **Reply-To:** `daniel@scheufler.tech`

### Campaign Settings
- **Type:** `regular` (standard email campaign)
- **Track Opens:** `true`
- **Language ID:** `4` (English)

## Email Template Structure

The newsletter template is stored at `docs/templates/newsletter-template.html` and follows this structure:

### Header Section
- Logo/banner image: `https://storage.mlcdn.com/account_image/379103/kJ404t6SVjw3rv9xbeF0rTbbUTqfnayikszaBxlW.png`
- Navigation menu with links to Blog and Books
- Background color: `#F4F7FA`

### Content Area
- Container width: 640px
- Background: `#e9e9ed`
- Padding: 50px on sides
- Font family: 'Roboto', sans-serif
- Text color: `#2A2828`

### Footer Section
- Unsubscribe link (MailerLite variable: `{$unsubscribe}`)
- Social links
- Company address/info

## Markdown to Email HTML Conversion

### Heading Styles
```html
<!-- H2 (Main Section) -->
<h2 style="font-family: 'Roboto', sans-serif; font-size: 24px; line-height: 150%; color: #2A2828; font-weight: bold; margin: 20px 0 10px 0;">
    Heading Text
</h2>

<!-- H3 (Subsection) -->
<h3 style="font-family: 'Roboto', sans-serif; font-size: 20px; line-height: 150%; color: #2A2828; font-weight: bold; margin: 15px 0 10px 0;">
    Subheading Text
</h3>
```

### Paragraph Styles
```html
<p style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 150%; color: #2A2828; margin: 0 0 15px 0;">
    Paragraph text here.
</p>
```

### Link Styles
```html
<a href="URL" style="color: #0066CC; text-decoration: underline;">Link Text</a>
```

### List Styles
```html
<!-- Unordered List -->
<ul style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 150%; color: #2A2828; margin: 0 0 15px 20px;">
    <li style="margin-bottom: 8px;">List item</li>
</ul>

<!-- Ordered List -->
<ol style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 150%; color: #2A2828; margin: 0 0 15px 20px;">
    <li style="margin-bottom: 8px;">List item</li>
</ol>
```

### Code Block Styles
```html
<pre style="font-family: 'Courier New', monospace; font-size: 14px; background-color: #f5f5f5; padding: 15px; border-radius: 4px; overflow-x: auto; margin: 0 0 15px 0;"><code>Code content here</code></pre>
```

### Emphasis Styles
```html
<!-- Bold -->
<strong style="font-weight: bold;">Bold text</strong>

<!-- Italic -->
<em style="font-style: italic;">Italic text</em>
```

## Content Insertion Pattern

The newsletter template has a content insertion point. To insert blog post content:

1. Locate the main content table (class `ml-default-border`, width 640px)
2. Insert converted HTML between header and footer sections
3. Maintain 50px horizontal padding
4. Ensure all styles are inline (no external CSS)

## Subject Line Patterns

Newsletter subject lines should:
- Be concise (50-60 characters ideal)
- Include emoji if relevant (e.g., 🚅 ⚖️ 💡)
- Ask a question or make a bold statement
- Avoid clickbait; be authentic

**Examples from existing campaigns:**
- "How do you build Engineering🚅 Judgement⚖️?"
- "Don't miss the simple tool to train Engineering🚅 Judgement⚖️!"

## Blog Post to Newsletter Conversion

### Content Adaptation
1. **Reading Stats:** Remove or adapt the `~XXX Words | ~Xmin Read` line
2. **Internal Links:** Convert relative blog links to absolute URLs
3. **Images:** Ensure images use absolute URLs
4. **Wiki Links:** Convert `[[Link]]` format to proper HTML links
5. **Author's Note:** Keep newsletter signup CTAs if present

### Newsletter-Specific Additions
1. **Intro Paragraph:** Optional personal intro before blog content
2. **Call to Action:** Link back to blog post for full article
3. **Footer CTA:** Encourage replies, social sharing, or blog visits

## MailerLite API Integration

### API Endpoint
```
POST https://connect.mailerlite.com/api/campaigns
```

### Authentication
```
Authorization: Bearer {API_TOKEN}
```

### Campaign Creation Payload
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

### Response
The API returns a campaign object with:
- `id` - Campaign ID for future reference
- `status` - Should be `"draft"`
- `default_email_id` - Email ID within campaign

### Dashboard Link
After creation, campaigns can be viewed at:
```
https://dashboard.mailerlite.com/campaigns/{campaign_id}
```

## Email HTML Best Practices

### Critical Rules
1. **Inline CSS:** All styles must be inline attributes
2. **Table Layouts:** Use tables for layout structure (email client compatibility)
3. **Absolute URLs:** All links and images must use absolute URLs
4. **Alt Text:** Always include alt attributes for images
5. **Plain Text:** Provide plain text fallback (MailerLite handles this)

### Mobile Responsiveness
The template includes media queries for mobile:
- Container collapses to 100% width
- Padding reduces to 20px
- Font sizes remain readable
- Images scale to container width

### Email Client Compatibility
The template includes fixes for:
- Outlook (MSO conditionals)
- iOS Mail (Apple data detectors)
- Gmail (Android center fix)
- Dark mode support

## Testing Checklist

Before sending campaigns:
1. ✅ All links are absolute URLs
2. ✅ Images load correctly
3. ✅ Subject line is compelling
4. ✅ Unsubscribe link is present
5. ✅ Content renders correctly on mobile
6. ✅ No broken formatting or styles
7. ✅ Sender information is correct

## Common Issues

### Issue: Links not working
**Solution:** Ensure all URLs are absolute (include `https://`)

### Issue: Images not displaying
**Solution:** Verify image URLs are publicly accessible

### Issue: Formatting breaks in email clients
**Solution:** Check that all styles are inline, not in `<style>` tags

### Issue: Content too wide on mobile
**Solution:** Ensure responsive media queries are present in template

---

**Last Updated:** 2026-02-19
