# Tag & Category Hierarchy Proposal

**Date:** 2025-10-29  
**Purpose:** Restructure blog taxonomy for improved discoverability and consistency

---

## Executive Summary

The current blog has **267 posts** with inconsistent categorization and tagging. This proposal recommends:
1. Simplifying categories to 3 top-level domains: **Software**, **Engineering**, and **Leadership**
2. Creating a controlled vocabulary of 20-30 tags through LLM-assisted corpus analysis
3. Implementing a two-phase approach: corpus analysis followed by individual post tagging

---

## Current State Analysis

### Categories
- **Current Structure:** Hierarchical (Personal/Professional/Software Development with subcategories)
- **Issues:**
  - Overlapping concepts (e.g., "Professional Development" vs "Personal Development")
  - Inconsistent application
  - Too granular for current content volume

### Tags
- **Current Issues:**
  - Inconsistent capitalization (`leadership` vs `Leadership`, `Communication` vs `communication`)
  - Overlapping concepts (`software dev` vs `software` vs `Software Development`)
  - Many single-use tags with low discoverability value
  - No controlled vocabulary

### Top Current Tags (by frequency)
```
97   - Software Development (category, not tag)
66   - Professional Development (category, not tag)
62   - leadership
52   - Lessons Learned
50   - Personal Development
38   - effectiveness
34   - agile
22   - software
22   - organizations
21   - communication
19   - teams
18   - learning
```

---

## Proposed Category Structure

### Three Top-Level Categories

#### 1. **Software**
*The craft of writing code*

**Scope:**
- Programming languages (JavaScript, Python, C++, etc.)
- Tools and IDEs (Atom, Jupyter, Docker, etc.)
- Frameworks and libraries (React, Redux, Angular, etc.)
- Code-level practices (TDD, defensive programming, code readability)
- Technical tutorials and TIL posts

**Example Posts:**
- "TIL: How to Use Map and Reduce"
- "Leveraging Generics in TypeScript"
- "Development Tool: Atom"
- "Docker for Development"

---

#### 2. **Engineering**
*The discipline of building systems*

**Scope:**
- Software architecture and design patterns
- System design and scalability
- Quality assurance and testing strategies
- Agile methodologies and processes
- DevOps and deployment practices
- Engineering best practices
- Technical decision-making

**Example Posts:**
- "Conway's Law and Software Architecture"
- "Design for Failure"
- "Cross-Functional Teams"
- "Modern Continuous Delivery"
- "Defensive Programming Revisited"

---

#### 3. **Leadership**
*The art of working with people*

**Scope:**
- People management and mentorship
- Team dynamics and culture
- Communication and facilitation
- Coaching and development
- Organizational behavior
- Career development
- Retrospectives and team practices
- Leadership philosophy

**Example Posts:**
- "Dungeons and Dragons and Leadership Training"
- "Cultivate Employee Judgment"
- "Engaging Facilitators"
- "On Effective Delegation"
- "Behaviors Build Culture"

---

## Proposed Tag Strategy

### Principles

1. **Lowercase only** - Consistency in formatting
2. **Singular form preferred** - Use "team" not "teams" (except where plural is standard)
3. **Hyphenated compounds** - Use "book-review" not "book review" or "bookreview"
4. **Cross-cutting concerns** - Tags should link posts across categories
5. **Controlled vocabulary** - 20-30 core tags, with occasional additions for novel concepts
6. **3-5 tags per post** - Enough for discoverability, not so many they lose meaning

### Proposed Tag Taxonomy

#### Practice Tags
*Methodologies and approaches*
- `agile`
- `scrum`
- `tdd`
- `retrospectives`
- `facilitation`
- `coaching`
- `mentorship`
- `refactoring`

#### Concept Tags
*Ideas and principles*
- `culture`
- `communication`
- `trust`
- `effectiveness`
- `quality`
- `architecture`
- `testing`
- `learning`
- `growth`
- `transformation`

#### Audience/Scope Tags
*Who or what the post is about*
- `teams`
- `organizations`
- `developers`
- `managers`
- `remote-work`
- `career`

#### Format Tags
*Type of content*
- `book-review`
- `conference-talk`
- `tutorial`
- `parable`
- `til` (Today I Learned)
- `repost`
- `show-notes`

#### Technology Tags
*Specific technologies (use sparingly)*
- `javascript`
- `python`
- `react`
- `docker`
- `typescript`
- `csharp`

#### Special Tags
- `featured` - Highlight exceptional posts
- `series` - Multi-part content

---

## Implementation Strategy

### Phase 1: Corpus Analysis (LLM-Assisted)

**Objective:** Understand the content landscape and identify natural clusters

**Process:**
1. Extract all post titles, current categories, and current tags
2. For a representative sample (50-100 posts), extract:
   - Full content or substantial excerpts
   - Current metadata
3. Use LLM to:
   - Identify recurring themes and concepts
   - Propose natural groupings
   - Suggest tag vocabulary based on actual content
   - Identify outliers and edge cases
4. Human review and refinement of proposed taxonomy

**Deliverables:**
- Finalized category mapping rules
- Approved tag vocabulary (20-30 tags)
- Edge case handling guidelines

---

### Phase 2: Individual Post Analysis

**Objective:** Apply the new taxonomy to all posts

**Process:**
1. For each post:
   - Analyze content against the 3 category definitions
   - Assign primary category
   - Select 3-5 tags from approved vocabulary
   - Flag posts that don't fit well (for manual review)
2. Generate migration report showing:
   - Old category → New category
   - Old tags → New tags
   - Confidence scores
   - Posts requiring manual review
3. Human review of flagged posts and low-confidence assignments
4. Apply changes to post frontmatter

**Deliverables:**
- Updated frontmatter for all posts
- Migration report documenting changes
- List of posts requiring manual attention

---

## Technical Implementation

### Proposed Tooling

**Script: `analyze-taxonomy.js`**
- Scans all posts in `source/_posts/`
- Extracts current categories and tags
- Generates statistics and reports
- Identifies inconsistencies

**Script: `propose-taxonomy.js`**
- Sends post content to LLM API (Claude/GPT-4)
- Collects taxonomy proposals
- Aggregates results
- Generates human-readable report

**Script: `apply-taxonomy.js`**
- Reads approved taxonomy from config file
- Updates post frontmatter
- Creates backup of original files
- Generates migration report

**Configuration: `taxonomy-config.json`**
```json
{
  "categories": ["Software", "Engineering", "Leadership"],
  "tags": {
    "approved": ["agile", "scrum", "tdd", ...],
    "deprecated": ["Professional Development", "Lessons Learned", ...]
  },
  "rules": {
    "maxTagsPerPost": 5,
    "minTagsPerPost": 3
  }
}
```

---

## Migration Considerations

### Backward Compatibility
- Keep old category/tag data in a comment or custom field for rollback
- Generate redirects if URLs are category-based
- Update any hardcoded category references in templates

### SEO Impact
- Monitor for any traffic drops after migration
- Update sitemap if categories affect URL structure
- Consider 301 redirects if needed

### Content Gaps
- Identify underrepresented categories
- Plan future content to balance portfolio
- Consider retiring or consolidating very old posts

---

## Success Metrics

### Quantitative
- **Consistency:** 100% of posts have exactly 1 category
- **Tag distribution:** No tag used on <3 posts or >50 posts
- **Coverage:** 95%+ of posts have 3-5 tags

### Qualitative
- **Discoverability:** Related posts are easier to find
- **Clarity:** Category purpose is immediately clear
- **Maintainability:** New posts are easy to categorize

---

## Next Steps

1. **Review & Approve** this proposal
2. **Build analysis scripts** to extract current state
3. **Run Phase 1** corpus analysis with LLM
4. **Refine taxonomy** based on analysis results
5. **Run Phase 2** individual post tagging
6. **Manual review** of flagged posts
7. **Apply migration** with backup
8. **Monitor & adjust** based on results

---

## Open Questions

1. **LLM API Choice:** Which API should we use? (Claude, GPT-4, local model?)
2. **Cost Considerations:** Budget for API calls (estimate: $10-50 for full corpus)
3. **Subcategories:** Do we want any subcategories, or keep it flat?
4. **Historical Posts:** Should very old posts be archived/retired instead of migrated?
5. **Series Handling:** How to handle multi-part series (special tag? category?)
6. **Draft Posts:** Should drafts be included in the migration?

---

## Appendix: Example Migrations

### Example 1: Technical Post
**Before:**
```yaml
title: "TIL: How to Use Map and Reduce"
categories:
  - Software Development
  - Tools
tags:
  - javascript
  - learning
  - Best Practices
```

**After:**
```yaml
title: "TIL: How to Use Map and Reduce"
categories:
  - Software
tags:
  - javascript
  - tutorial
  - til
```

---

### Example 2: Leadership Post
**Before:**
```yaml
title: "Cultivate Employee Judgment"
categories:
  - Professional Development
  - Leadership
tags:
  - leadership
  - management
  - trust
  - teams
```

**After:**
```yaml
title: "Cultivate Employee Judgment"
categories:
  - Leadership
tags:
  - management
  - trust
  - teams
  - growth
```

---

### Example 3: Process Post
**Before:**
```yaml
title: "Cross-Functional Teams"
categories:
  - Software Development
  - agile
tags:
  - teams
  - scrum
  - cross-functional
  - effectiveness
```

**After:**
```yaml
title: "Cross-Functional Teams"
categories:
  - Engineering
tags:
  - agile
  - scrum
  - teams
  - effectiveness
```

---

## References

- Current blog structure: `source/_posts/`
- Draft category map: `source/_drafts/Categories.md`
- Post count: 267 markdown files
- Analysis date: 2025-10-29
