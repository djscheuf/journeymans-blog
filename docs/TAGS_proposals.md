# Tag Consolidation & Addition Proposals

**Generated on:** 2026-01-12

## Overview

This document contains recommendations for consolidating existing tags and potential additions to the approved tag list based on analysis of 85 blog posts published since 2023.

---

## Consolidation Recommendations

### 1. **Merge: retrospective → retrospectives**
- Current: `retrospective` (1 post), `retrospectives` (4 posts)
- **Recommendation:** Standardize on `retrospectives` (plural)
- **Rationale:** Consistency and the plural form is more commonly used

### 2. **Merge: software design → design**
- Current: `software design` (1 post), `design` (2 posts)
- **Recommendation:** Use `design` for broader applicability
- **Rationale:** Design principles apply beyond just software; keep it general

### 3. **Fix typo: organizationsal-change-management**
- Current: `organizationsal-change-management` (1 post)
- **Recommendation:** This appears to be a typo; content likely fits under `transformation` or `organizations`
- **Rationale:** Typo correction and consolidation

### 4. **Consider merging: executive → leadership**
- Current: `executive` (3 posts), `leadership` (41 posts)
- **Recommendation:** Evaluate if `executive` content could use `leadership` instead
- **Rationale:** Executive topics are a subset of leadership; reduces tag fragmentation

### 5. **Consider merging: self-leadership → leadership**
- Current: `self-leadership` (1 post), `leadership` (41 posts)
- **Recommendation:** Use `leadership` for self-leadership content
- **Rationale:** Self-leadership is a leadership topic; single post doesn't justify separate tag

---

## Tags Considered But Not Included in Top 20

These tags appeared in the analysis but were not included in the approved list. They may be candidates for future addition or should be mapped to existing approved tags.

### High-Frequency Tags (5+ posts)
- **podcast** (7 posts) - *Consider:* May be more of a content format than a topic
- **scrum** (5 posts) - *Maps to:* `agile` (Scrum is a specific agile framework)

### Medium-Frequency Tags (3-4 posts)
- **books** (4 posts) - *Consider:* Content format; book review posts could use topical tags instead
- **metrics** (3 posts) - *Maps to:* `effectiveness` or `process`
- **delegation** (3 posts) - *Maps to:* `leadership`
- **executive** (3 posts) - *Maps to:* `leadership`
- **jobs-to-be-done** (3 posts) - *Maps to:* `product-management`

### Low-Frequency Tags (1-2 posts)
These tags appeared infrequently and should map to approved tags:

- `authentication`, `authorization`, `security` → `architecture`
- `checklists`, `tools` → `process`
- `courage`, `humility` → `leadership` or `culture`
- `disc`, `mindset`, `habits` → `learning` or `effectiveness`
- `documentation` → `communication` or `process`
- `endurance`, `performance` → `effectiveness`
- `estimation`, `planning` → `process` or `agile`
- `flow`, `lean`, `theory-of-constraints` → `process` or `effectiveness`
- `goals`, `okr` → `effectiveness` or `organizations`
- `growth`, `mentorship` → `learning` or `coaching`
- `identity` → `organizations` or `culture`
- `models` → `learning` or `architecture`
- `quality` → `testing` or `effectiveness`
- `software` → `architecture` or `testing`
- `ux` → `design` (if design tag is added) or `effectiveness`

---

## Potential Future Additions

Based on content themes and gaps in the current tag set, consider these additions if content volume increases:

### 1. **design**
- **Frequency:** 2 posts (plus 1 "software design")
- **Rationale:** Design thinking, UX, and design principles are distinct topics
- **Would replace:** Could consolidate design, software design, and ux

### 2. **metrics**
- **Frequency:** 3 posts
- **Rationale:** Measurement and metrics are important for effectiveness but distinct enough
- **Would complement:** `effectiveness`, `process`

### 3. **scrum**
- **Frequency:** 5 posts
- **Rationale:** Specific agile framework with dedicated following
- **Trade-off:** May fragment from general `agile` tag

### 4. **delegation**
- **Frequency:** 3 posts
- **Rationale:** Important leadership skill that could grow as a topic
- **Would complement:** `leadership`, `coaching`

### 5. **security**
- **Frequency:** 2 posts (authentication + authorization + security)
- **Rationale:** Growing importance of security topics
- **Would complement:** `architecture`

---

## Migration Strategy

When updating existing posts to use the new approved tag list:

1. **High Priority:** Fix the typo in `organizationsal-change-management`
2. **Medium Priority:** Consolidate `retrospective` → `retrospectives`
3. **Low Priority:** Review posts with deprecated tags and remap to approved tags
4. **Ongoing:** When writing new posts, use only approved tags from `TAGS.md`

---

## Review Cycle

**Recommendation:** Review this tag list every 6-12 months or after 50+ new posts to:
- Identify emerging themes that deserve new tags
- Consolidate underused tags
- Ensure tags still serve reader discovery goals

---

## Notes

- Analysis based on 85 posts since 2023 with 59 unique tags
- Average of 3.0 tags per post aligns with the "3 tags per post" guideline
- Top 20 tags cover 215 of 258 total tag instances (83% coverage)
