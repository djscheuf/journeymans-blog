# BPI → Blog Post Publishing Pipeline

Derived from: `202610200817-deterministic-node-js-publishing-pipeline-with-bounded-agentic-tasks-for-hexo-blogs-transcript.md`

A mostly-deterministic Node.js pipeline that converts a Blog Post Idea (BPI) document
into a committed Hexo blog post, with a small set of bounded agentic tasks (targeting
cheap, Haiku-class models) for semantic decisions.

**Pipeline inputs:**

| Input | Description |
|---|---|
| `bpi_path` | Path to the BPI markdown file |
| `publish_date` | Target publish date for the post |

**Shared state:** a working JSON document (e.g., `workdir/post.json`) that each step
reads and/or extends. After every agentic step, the JSON is validated against a
schema — each agentic action should change it by roughly one property.

---

## Steps

### 1. Validate input file — Deterministic

Verify the BPI file exists, is readable, contains a Hemingway section, and that the
filename conforms to the expected convention (`{date:YYYYMMDDHHmm} - BPI - {title}`).

- **In:** `bpi_path`
- **Out:** pass/fail; aborts pipeline on failure

### 2. Input curation / content prep — Deterministic

Extract the title, Hemingway section content, and publish date. Compute word count
(e.g., via `awk` on the Hemingway content) and reading time.

- **In:** `bpi_path`, `publish_date`
- **Out:** working JSON document created in the working directory containing
  `title`, `hemingway_content`, `publish_date`, `word_count`, `reading_time`

### 3. Derive/improve title — Agentic

Optional pass to produce a better title than the filename-derived one.

- **In:** working JSON (`title`, `hemingway_content`)
- **Out:** updated `title` property in the JSON

### 4. Classify section — Agentic

Predict the blog section for the post (e.g., software engineering vs. leadership).

- **In:** working JSON (`title`, `hemingway_content`)
- **Out:** `section` property added to the JSON

### 5. Determine tags/keywords — Agentic

Semantic tagging of the post content.

- **In:** working JSON (`title`, `hemingway_content`, `section`)
- **Out:** `tags` property added to the JSON

### 6. Select cover image — Agentic

Semantic match of post content against the image library to pick the most
appropriate header image. Cheap model tier is sufficient. Open improvement: image
selection currently mutates the image JSON store — consider moving to a vector
search (e.g., Pinecone).

- **In:** working JSON (`title`, `hemingway_content`, `tags`), image library
- **Out:** `image` property added to the JSON

### 7. Schema validation — Deterministic

Validate the working JSON against the schema. Runs after each agentic step as well
as a final check before post generation.

- **In:** working JSON
- **Out:** pass/fail; aborts or flags on failure

### 8. Generate blog post file — Deterministic

Template substitution: create the post file with the proper title, word count,
reading time, publish date, tags, image, and Hemingway content inserted in the
appropriate order.

- **In:** working JSON, post template
- **Out:** markdown blog post file ready for Hexo

### 9. Create git branch — Deterministic

Cut a new branch from `master` named after the post slug.

- **In:** post slug (from `title`)
- **Out:** checked-out branch

### 10. Commit post file — Deterministic

Add the generated post file and commit with the fixed message format
`post(<slug>)`.

- **In:** generated post file, post slug
- **Out:** commit on the new branch

---

## Supporting work

- Implement each agentic step as a small standalone skill (title, section, tags,
  image) so each can be prompt-evaled independently later — manual adjustment of
  outputs is common today.
- Orchestrate via a Node script composed of small invocable sub-scripts, each step
  independently checkable (consistent with the Hexo/JavaScript stack).
- Designed to run unsupervised once `bpi_path` and `publish_date` are supplied.
