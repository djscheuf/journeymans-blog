---
description: Agentic pipeline step — classify a blog post into exactly one category (Leadership, Engineering, or Software); updates the `category` field in the working post.json
---

# Select Post Category

Bounded agentic task in the BPI → blog post pipeline. Cheap model tier is
sufficient — this is a single classification decision.

## Inputs

- `workdir/post.json` — working document.
  Reads: `title`, `hemingway_content`.
- `{repo_root}/docs/CATEGORIES.md` — authoritative category definitions and
  decision framework. Read this file before deciding.

## Task

Assign exactly **one** primary category: `Leadership`, `Engineering`, or
`Software`.

Decision framework (see CATEGORIES.md for full detail):

1. **Primary audience?** Leaders/Managers → Leadership ·
   Engineers/Developers → Engineering · Business/Technology Leaders → Software
2. **Main takeaway?** How to lead people → Leadership ·
   How to build/test/deliver software → Engineering ·
   How software fits business strategy → Software
3. **Domain of the solution?** People/organizational systems → Leadership ·
   Technical practices/processes → Engineering ·
   Business strategy/technology decisions → Software

The category should reflect the **primary lens** of the content, not every
topic mentioned. If genuinely ambiguous, prefer the primary audience.

## Output

Update `post.json` in place:

- `category` — one of `"Leadership"`, `"Engineering"`, `"Software"`
- `category_rationale` — one sentence explaining the choice (aids eval later)

This step must change **only** those properties.
