# MailerLite Integration Requirements

**Created:** 2026-02-19  
**Status:** In Development

---

## Overview

Integration with MailerLite to create draft newsletter campaigns from blog posts using the MailerLite MCP (Model Context Protocol) server.

## Goals

1. Convert published blog posts into newsletter-ready draft campaigns
2. Maintain consistent newsletter styling and format
3. Leverage MCP for direct MailerLite integration
4. Enable occasional template updates from existing campaigns

---

## Integration Approach

### Primary Method: MCP Server

**MCP Endpoint:** `https://mcp.mailerlite.com/mcp`

**Authentication:** OAuth (handled by Windsurf/Cascade MCP integration)

**Key MCP Tools:**
- `create_campaign` - Create new draft campaigns
- `get_campaign` - Retrieve existing campaign details (for template extraction)
- `update_campaign` - Update campaign content
- `list_campaigns` - List campaigns for template selection

---

## Technical Findings

### MailerLite Campaign API

**Campaign Types:**
- `regular` - Standard email campaign (primary use case)
- `ab` - A/B testing campaigns
- `resend` - Resend campaigns
- `multivariate` - Multivariate testing

**Campaign Status:**
- `draft` - Default status for new campaigns
- `ready` - Ready to send
- `sent` - Already sent

**Required Fields for Campaign Creation:**
- `name` - Campaign name (internal)
- `type` - Campaign type (use `regular`)
- `emails` - Array of email objects containing:
  - `from` - Sender email
  - `from_name` - Sender name
  - `subject` - Email subject line
  - `content` - HTML content (custom HTML)

**Optional Fields:**
- `groups` - Target subscriber groups
- `settings.track_opens` - Track email opens (default: true)
- `settings.use_google_analytics` - Enable GA tracking
- `language_id` - Campaign language

### Content Requirements

**Critical Constraint:** MailerLite requires HTML content for campaigns.

**Conversion Pipeline:**
1. Source: Markdown blog post with front matter
2. Transform: Markdown → HTML with email-friendly styling
3. Apply: Newsletter template (header, footer, styling)
4. Output: Inline CSS, responsive HTML

**Email HTML Best Practices:**
- Inline CSS (no external stylesheets)
- Table-based layouts for email client compatibility
- Responsive design with media queries
- Alt text for images
- Plain text fallback

---

## Workflow Design

### Primary Workflow: Blog Post to Newsletter

**Name:** `bpi-to-newsletter` or `blog-to-newsletter`

**Input:** Published blog post file path (output from `bpi-to-blog-post` workflow)

**Process:**
1. Read published blog post (front matter + content)
2. Extract metadata (title, description, date)
3. Generate newsletter subject line (may differ from blog title)
4. Convert Markdown content to email HTML
5. Apply newsletter template (header, footer, styling)
6. Create draft campaign via MCP `create_campaign`
7. Confirm creation with campaign ID and dashboard link

**Output:** Draft campaign in MailerLite ready for review/scheduling

### Supporting Workflow: Update Email Template

**Name:** `update-email-template`

**Purpose:** Extract HTML from existing MailerLite campaign to update local template

**Process:**
1. List recent campaigns via MCP `list_campaigns`
2. User selects campaign to use as template
3. Get campaign details via MCP `get_campaign`
4. Extract HTML structure (header, footer, styling)
5. Save as local template file
6. Confirm template updated

**Frequency:** Occasional (when newsletter design changes)

---

## Skill Requirements

### Mailerlite-Email Skill

**Purpose:** Provide just-in-time context for email HTML conversion and styling

**Knowledge Areas:**
1. **Markdown to Email HTML Conversion**
   - Heading styles (H1, H2, H3)
   - Paragraph spacing
   - Link styling
   - List formatting
   - Code block handling (if applicable)

2. **Email Template Structure**
   - Header section (logo, branding)
   - Content area (converted blog post)
   - Footer section (unsubscribe, social links, address)
   - Responsive container structure

3. **Email-Specific CSS**
   - Inline CSS requirements
   - Table-based layouts
   - Email client compatibility
   - Mobile responsiveness
   - Color scheme and typography

4. **Newsletter Style Guidelines**
   - Sender information (from, from_name)
   - Subject line patterns
   - Intro/outro sections
   - Call-to-action placement
   - Image handling

**Usage:** Invoked during blog-to-newsletter workflow when HTML conversion is needed

---

## Newsletter Format Decisions Needed

### Content Strategy
- [ ] Full article in email vs. excerpt with "read more" link?
- [ ] Include personal intro/outro sections?
- [ ] Standard sections (e.g., "From the blog this week")?
- [ ] Handle blog post images in email?

### Template Structure
- [ ] Extract from existing campaign or create new?
- [ ] Newsletter header/branding elements
- [ ] Footer content (social links, unsubscribe, address)
- [ ] Color scheme and typography

### Sender Configuration
- [ ] From email address
- [ ] From name
- [ ] Reply-to address
- [ ] Default subscriber group(s)

---

## Implementation Phases

### Phase 1: Template Extraction ✓
- [ ] Connect MailerLite MCP to Windsurf
- [ ] List existing campaigns
- [ ] Extract HTML from selected campaign
- [ ] Create base template file

### Phase 2: Skill Creation
- [ ] Create `mailerlite-email.md` skill
- [ ] Document HTML conversion patterns
- [ ] Document template structure
- [ ] Document styling guidelines

### Phase 3: Workflow Creation
- [ ] Create `blog-to-newsletter.md` workflow
- [ ] Implement Markdown → HTML conversion
- [ ] Integrate template application
- [ ] Test MCP campaign creation

### Phase 4: Template Update Workflow
- [ ] Create `update-email-template.md` workflow
- [ ] Implement campaign selection
- [ ] Implement HTML extraction
- [ ] Test template update process

---

## File Structure

```
journeymans-blog/
├── .windsurf/
│   ├── skills/
│   │   └── mailerlite-email.md          # Email HTML conversion skill
│   └── workflows/
│       ├── bpi-to-blog-post.md          # Existing (input to new workflow)
│       ├── blog-to-newsletter.md        # New: Blog → Newsletter
│       └── update-email-template.md     # New: Template extraction
├── docs/
│   ├── reqs/
│   │   └── mailerlite-intg.md          # This document
│   └── templates/
│       └── newsletter-template.html     # Email HTML template
```

---

## Dependencies

### External Services
- MailerLite account with API access
- MCP server connection configured in Windsurf

### Internal Dependencies
- `bpi-to-blog-post` workflow (produces input)
- Blog post structure (front matter + Markdown)
- Hexo blog configuration

### Technical Requirements
- Markdown parser (for content extraction)
- HTML generation (for email content)
- CSS inlining (for email compatibility)

---

## Success Criteria

1. **Workflow Execution:** Create draft newsletter campaign from blog post in < 2 minutes
2. **Template Consistency:** Generated emails match newsletter style/branding
3. **MCP Integration:** Reliable campaign creation via MCP tools
4. **Template Updates:** Extract and update template from existing campaigns
5. **Maintainability:** Clear documentation for future modifications

---

## Open Questions

1. What's the typical newsletter format? (full article vs. excerpt)
2. Do existing MailerLite campaigns have the desired template?
3. Should we include blog post metadata (categories, tags) in newsletter?
4. How to handle blog post images in email (inline vs. linked)?
5. Default subscriber group(s) for campaigns?

---

## References

### MailerLite Documentation
- [MCP Server Documentation](https://developers.mailerlite.com/mcp/)
- [Campaigns API](https://developers.mailerlite.com/docs/campaigns)
- [Getting Started](https://developers.mailerlite.com/docs/)

### Related Workflows
- `@/mnt/data/0_repo/journeymans-blog/.windsurf/workflows/bpi-to-blog-post.md`

### Example Blog Posts
- `@/mnt/data/0_repo/journeymans-blog/source/_posts/ai-wont-transform.md`

---

**Last Updated:** 2026-02-19
