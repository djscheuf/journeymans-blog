# Tag Selection Prompt for New Blog Posts

**Purpose:** Use this prompt with an AI agent when writing a new blog post to help select the most appropriate 3 tags from the approved list.

---

## Prompt for AI Agent

```
I'm writing a new blog post and need help selecting 3 tags from my approved tag list.

### Approved Tags

Here are the 20 approved tags I can use:

1. **leadership** - Leadership principles, practices, and development
2. **effectiveness** - Improving personal, team, and organizational effectiveness
3. **organizations** - Organizational structure, dynamics, and culture
4. **teams** - Team dynamics, collaboration, and high-performing teams
5. **agile** - Agile methodologies, principles, and practices
6. **communication** - Communication skills and strategies
7. **transformation** - Organizational change and transformation initiatives
8. **learning** - Continuous learning and professional development
9. **culture** - Organizational culture and behavioral norms
10. **trust** - Building and maintaining trust
11. **testing** - Software testing and quality assurance
12. **architecture** - Software architecture and system design
13. **facilitation** - Running effective meetings and workshops
14. **coaching** - Coaching skills and developing others
15. **process** - Process improvement and workflow optimization
16. **decision-making** - Decision frameworks and judgment
17. **product-management** - Product ownership and strategy
18. **career** - Career development and professional growth
19. **ai** - Artificial intelligence and AI tools
20. **retrospectives** - Retrospective practices and continuous improvement

### My Blog Post

**Title:** [PASTE YOUR TITLE]

**Content/Summary:** [PASTE YOUR POST CONTENT OR A SUMMARY]

### Your Task

1. Read my blog post content
2. Identify the 3 most relevant tags from the approved list above
3. Explain why each tag is appropriate
4. Ensure the tags will help readers discover related content

### Selection Criteria

- Choose tags that represent the **core themes** of the post
- Prioritize tags that will **connect this post to others** in my blog
- Avoid tags that are only tangentially related
- The 3 tags should cover different aspects when possible (not all similar)
- Think about what readers interested in this topic would want to explore next

### Output Format

Provide your recommendation in this format:

**Recommended Tags:**
1. `tag-name` - [Brief explanation of why this tag fits]
2. `tag-name` - [Brief explanation of why this tag fits]
3. `tag-name` - [Brief explanation of why this tag fits]

**Alternative Considerations:**
- [Any other tags that were close contenders and why you didn't choose them]

**Tag Combination Rationale:**
- [Brief explanation of how these 3 tags work together to aid content discovery]
```

---

## Quick Usage

1. **Copy the prompt above**
2. **Fill in your blog post title and content** (or just a summary)
3. **Paste into your AI agent** (ChatGPT, Claude, etc.)
4. **Review the recommendations** and add the tags to your frontmatter

---

## Example Usage

### Example 1: Post about AI in Meetings

**Input:**
```
Title: AI in Meetings
Summary: How AI tools can help make meetings more effective by helping with note-taking, 
action items, and post-meeting analysis. Emphasizes that AI is just a tool - humans still 
need to handle the people and process aspects.
```

**Output:**
```
Recommended Tags:
1. `ai` - The post is specifically about AI tools and their application
2. `effectiveness` - Focus is on making meetings more effective
3. `teams` - Meetings are a team activity and the post addresses team dynamics

Alternative Considerations:
- `communication` was considered but the post is more about meeting effectiveness than 
  communication skills specifically

Tag Combination Rationale:
These tags connect the post to other content about AI adoption, effectiveness practices, 
and team collaboration, helping readers explore related topics.
```

---

## Tips for Better Tag Selection

### Do:
- ✅ Choose tags that represent the **main themes**, not minor mentions
- ✅ Think about **reader discovery** - what would someone searching for want to find?
- ✅ Use tags that **connect to existing content** clusters
- ✅ Consider the **balance** - mix broader and more specific tags

### Don't:
- ❌ Use tags for topics only briefly mentioned
- ❌ Choose 3 very similar tags (e.g., leadership, coaching, mentorship all together)
- ❌ Pick tags just because they're popular
- ❌ Create new tags - stick to the approved list

---

## Common Tag Combinations

Here are some effective tag combinations for common post types:

**Leadership posts:**
- `leadership` + `effectiveness` + `teams`
- `leadership` + `culture` + `organizations`
- `leadership` + `coaching` + `learning`

**Technical posts:**
- `architecture` + `testing` + `effectiveness`
- `testing` + `process` + `agile`
- `architecture` + `decision-making` + `teams`

**Agile/Process posts:**
- `agile` + `teams` + `effectiveness`
- `retrospectives` + `learning` + `teams`
- `transformation` + `agile` + `organizations`

**Organizational posts:**
- `organizations` + `culture` + `leadership`
- `transformation` + `organizations` + `effectiveness`
- `trust` + `teams` + `culture`

**Career/Development posts:**
- `career` + `learning` + `leadership`
- `coaching` + `learning` + `effectiveness`
- `career` + `decision-making` + `effectiveness`

---

## Validation Checklist

Before finalizing your tags, check:

- [ ] All 3 tags are from the approved list in `docs/TAGS.md`
- [ ] Tags represent core themes, not peripheral mentions
- [ ] Tags will help readers discover related content
- [ ] Tags provide some variety (not all too similar)
- [ ] You can explain why each tag was chosen

---

## Notes

- Created: 2026-01-12
- See `docs/TAGS.md` for full tag definitions
- See `docs/TAG_ANALYSIS_PROMPT.md` for updating the tag list
