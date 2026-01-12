# Blog Tag Analysis Prompt

**Purpose:** Use this prompt with an AI agent to analyze blog post tags and generate/update the approved tag list.

---

## Prompt for AI Agent

```
I need you to analyze the tags used in my blog posts and help me curate an approved list of tags for future posts.

### Context
- I have a Hexo-based blog with posts in `source/_posts/` directory
- Each post has YAML frontmatter with a `date` field and optional `tags` field
- Tags help readers discover related content; each tag generates its own index page
- Each blog post should use approximately 3 tags

### Your Task

1. **Extract and analyze tags** from all blog posts published since 2023 (use the `date` field in frontmatter)

2. **Generate statistics:**
   - Total posts analyzed
   - Total unique tags
   - Tag frequency distribution
   - Average tags per post
   - List all tags sorted by frequency

3. **Create a curated list of 20 approved tags** that:
   - Cover the main themes in my content
   - Are broad enough to connect multiple posts
   - Are specific enough to be meaningful
   - Include clear definitions for each tag
   - Are ordered by frequency/importance

4. **Identify consolidation opportunities:**
   - Similar tags that should be merged (e.g., singular/plural)
   - Typos or inconsistencies
   - Overly specific tags that could map to broader ones
   - Tags used only once or twice

5. **Provide recommendations for:**
   - Tags to consolidate and their target tag
   - Potential future tag additions if content volume grows
   - Migration strategy for updating old posts

### Output Format

Generate two markdown documents:

#### 1. `docs/TAGS.md`
- Include "Generated on: YYYY-MM-DD" at the top
- List of 20 approved tags with clear definitions
- Usage guidelines (3 tags per post)
- Examples of good tag combinations
- Notes on how the list was created

#### 2. `docs/TAGS_proposals.md`
- Include "Generated on: YYYY-MM-DD" at the top
- Consolidation recommendations with rationale
- List of tags considered but not included
- Mapping of deprecated tags to approved tags
- Potential future additions
- Review cycle recommendations

### Analysis Script

You can use this Node.js script to extract tag data:

[See analyze_tags.js in the repo root]

Run with: `node analyze_tags.js`

This will generate `tag_analysis_results.txt` with raw data.

### Key Principles

- **Reader-focused:** Tags should help readers discover related content
- **Consistency:** Standardize on singular vs plural, casing, hyphenation
- **Coverage:** Top 20 tags should cover 80%+ of tag usage
- **Flexibility:** Leave room for emerging themes
- **Simplicity:** Avoid overly specific or technical jargon tags
```

---

## Usage Instructions

1. **Copy the prompt above** and provide it to your AI agent (ChatGPT, Claude, etc.)

2. **Provide context files:**
   - Share a few sample blog posts so the agent understands your frontmatter format
   - Share the current `analyze_tags.js` script if available
   - Share the current `TAGS.md` if updating an existing list

3. **Specify the time period:**
   - Default: Posts since 2023
   - Adjust as needed: "Analyze posts from the last 2 years" or "since 2024"

4. **Review and refine:**
   - The AI will generate initial recommendations
   - Review the proposed tags for accuracy and relevance
   - Ask for adjustments: "Make tag X more specific" or "Merge tags Y and Z"

5. **Update the documents:**
   - Replace `docs/TAGS.md` with the new version
   - Review `docs/TAGS_proposals.md` for action items
   - Update the "Generated on" date

---

## Customization Options

Modify the prompt based on your needs:

### Adjust the number of tags
```
Create a curated list of [15/20/25] approved tags...
```

### Change the time period
```
Extract and analyze tags from all blog posts published since [2022/2024/last 18 months]...
```

### Adjust tags per post
```
Each blog post should use approximately [2-4/3-5] tags
```

### Focus on specific themes
```
Prioritize tags related to [leadership/technical topics/specific domain]...
```

### Include category analysis
```
Also analyze the 'categories' field and recommend a category structure...
```

---

## Maintenance Schedule

**Recommended frequency:** Run this analysis every 6-12 months or after 50+ new posts

**Triggers for re-analysis:**
- Significant shift in content themes
- Tag proliferation (too many unique tags)
- Reader feedback about discoverability
- Major blog reorganization

---

## Notes

- This prompt was created on 2026-01-12
- Based on analysis of 85 posts with 59 unique tags
- Adjust the prompt as your blog evolves
- Keep the analysis script (`analyze_tags.js`) updated with any frontmatter format changes
