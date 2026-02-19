---
description: Extract HTML from existing MailerLite campaign to update local template
---

# Update Email Template from Campaign

This workflow extracts the HTML template from an existing MailerLite campaign and updates the local template file. Use this when your newsletter design changes in MailerLite and you want to sync it locally.

## Prerequisites

- MailerLite API key set in environment: `MAILERLITE_API_KEY`
- Access to MailerLite campaigns

## Workflow Steps

### 1. List Recent Campaigns

// turbo
Use the helper script to list recent campaigns:

```bash
MAILERLITE_API_KEY="$MAILERLITE_API_KEY" node scripts/mailerlite-api.js list 20
```

This will display campaigns in the format:
```
{campaign_id} | {status} | {campaign_name}
```

### 2. Select Template Source Campaign

Present the list to the user and ask:
**"Which campaign should be used as the template source? (Provide the campaign ID)"**

Wait for user to provide the campaign ID.

### 3. Extract Campaign HTML

// turbo
Once the user provides the campaign ID, extract the HTML:

```bash
MAILERLITE_API_KEY="$MAILERLITE_API_KEY" node scripts/mailerlite-api.js extract-html {campaign_id} /tmp/new-template.html
```

The script will save the HTML to `/tmp/new-template.html` and display:
- Output file path
- HTML length in characters

### 4. Review Template Changes

Read the extracted template to verify it's valid:

```bash
head -n 50 /tmp/new-template.html
```

Check for:
- Proper HTML structure (doctype, html, head, body tags)
- MailerLite variables (e.g., `{$unsubscribe}`)
- Logo/branding elements
- Navigation menu
- Footer content

### 5. Backup Current Template

// turbo
Before overwriting, backup the current template:

```bash
cp docs/templates/newsletter-template.html docs/templates/newsletter-template.backup.html
```

### 6. Update Template File

// turbo
Copy the new template to the active location:

```bash
cp /tmp/new-template.html docs/templates/newsletter-template.html
```

### 7. Update Skill Documentation

Review the extracted template and check if any styling or structure has changed that requires updating the `mailerlite-email` skill.

**Ask the user:** "Should I review the new template and update the mailerlite-email skill documentation if needed?"

If yes:
1. Read the new template
2. Identify any changes to:
   - Color schemes
   - Font styles
   - Layout structure
   - CSS classes
3. Update `.windsurf/skills/mailerlite-email.md` accordingly

### 8. Confirm Completion

Inform the user:
- ✅ Template updated: `docs/templates/newsletter-template.html`
- 💾 Backup saved: `docs/templates/newsletter-template.backup.html`
- 📏 New template size: `{size} characters`
- 📋 Source campaign: `{campaign_name}` (ID: `{campaign_id}`)

**Next steps:** 
- Review the new template file
- Test with `blog-to-newsletter` workflow
- If issues arise, restore from backup

## Example Execution

**Steps:**
1. List campaigns → Shows 20 recent campaigns
2. User selects campaign ID: `173060520782333569`
3. Extract HTML → Saved to `/tmp/new-template.html` (29,136 characters)
4. Review template → Looks valid
5. Backup current → Saved to `newsletter-template.backup.html`
6. Update template → Copied to `newsletter-template.html`
7. User declines skill update
8. Confirm completion

## Notes

- This workflow should be run occasionally when newsletter design changes
- Always creates a backup before overwriting
- The template includes MailerLite-specific variables and structure
- Changes to the template may require updating the `mailerlite-email` skill

## Troubleshooting

**Issue:** Campaign ID not found
- **Solution:** Verify the campaign ID is correct, try listing campaigns again

**Issue:** Extracted HTML is empty or invalid
- **Solution:** Check that the campaign has content, try a different campaign

**Issue:** Template backup fails
- **Solution:** Ensure `docs/templates/` directory exists and is writable

**Issue:** New template breaks newsletter generation
- **Solution:** Restore from backup: `cp docs/templates/newsletter-template.backup.html docs/templates/newsletter-template.html`

## Related Files

- **Template:** `docs/templates/newsletter-template.html` - Active newsletter template
- **Backup:** `docs/templates/newsletter-template.backup.html` - Previous template version
- **Skill:** `.windsurf/skills/mailerlite-email.md` - Email HTML conversion guidance
- **Helper Script:** `scripts/mailerlite-api.js` - MailerLite API wrapper
- **Related Workflow:** `.windsurf/workflows/blog-to-newsletter.md` - Uses this template

---

**Last Updated:** 2026-02-19
