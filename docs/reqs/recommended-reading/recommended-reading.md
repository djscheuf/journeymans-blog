# Recommended Reading Extension: Existing Patterns & Open Questions

**Created:** 2026-11-04
**Status:** v1 implemented (books, internal posts, generic links). v2 (Amazon affiliate links) specified in Part 7, not yet built.
**Branch:** `feat/further-reading`

---

## Goal

Add an optional front matter block to blog posts that renders a small handful of "further reading" links at the end of a post. The links point at larger sources the post draws from but does not name directly. They should look and feel like the "Read These Next" and "Read these, to get started today" sections of the Orchestrating Chaos take-away kit (TAK):

- Books show a **cover image**.
- Other posts on this blog show the **site icon**.
- Other external links show a **recognisable icon** (Wikipedia, GitHub, etc.).

---

## Part 1: How the Repo Extends Post Generation Today

There are three distinct extension mechanisms. The recommended reading feature will be closest to the first.

### Pattern A: Front matter flag, theme partial, rendered after the article (Hotpot)

This is the only "optional post section" in the theme today.

| Layer | Location | Behaviour |
|---|---|---|
| Authoring | post front matter | `used-hotpot: true` (boolean, absent = off) |
| Wiring | [post-content.ejs:41](../../../themes/A%20la%20Clear/layout/_partial/articles/post-content.ejs) | `<%- partial('_partial/articles/hotpot') %>` is placed between `</article>` and the post-nav partial, **unconditionally** |
| Gate | [hotpot.ejs](../../../themes/A%20la%20Clear/layout/_partial/articles/hotpot.ejs) | The *partial* checks `page["used-hotpot"]` and emits nothing if false |
| Styling | `.attributions blockquote` in [_site.less:510](../../../themes/A%20la%20Clear/source/less/_site.less) | Small, muted, left-bordered blockquote |

Conventions worth copying:

1. The partial is always included and owns its own guard. `post-content.ejs` stays free of conditionals.
2. The section sits **outside** `<article>` but inside `.post`, so it is not part of `.entry-content` and does not pick up body-copy styles.
3. Flag name is kebab-case (`used-hotpot`).

Observed rough edges (not blocking, but relevant to naming):

- One post uses `use-hotpot` instead of `used-hotpot` ([rocc-it-leverage-ai.md](../../../source/_posts/rocc-it-leverage-ai.md)), so its attribution silently never renders. Optional fields have no validation, so typos fail silently.
- The `.attributions` wrapper `<div>` is rendered even when empty.

### Pattern B: Front matter flag consumed inside a header partial (age warning, subtitle)

| Field | Used by | Notes |
|---|---|---|
| `hideContentWarning` | [age-warning.ejs](../../../themes/A%20la%20Clear/layout/_partial/articles/age-warning.ejs) | camelCase, unlike `used-hotpot`. Opt-out of a computed badge |
| `subtitle` | `post-content.ejs` | Optional string, rendered inside the `<h1>` |
| `photos` | `post-content.ejs` | Array, first item used as header image; paths may be absolute URLs or site-relative (`isFullUrl` helper) |

Takeaway: the existing front matter is **flat scalars and simple arrays**. There is no precedent yet for an array of objects in a post.

### Pattern C: Standalone, self-styled page copied raw (Take-Away Kit, menu)

The TAK is **not** a theme partial or a Hexo-rendered page.

- Lives at `source/talks/orchestrating-chaos/take-away-kit.html` (plus `menu.html`).
- Excluded from rendering by `skip_render` in [_config.yml](../../../_config.yml):
  `"talks/orchestrating-chaos/**"`. It is copied byte-for-byte, so no theme, no LESS, no EJS.
- Fully self-contained: ~545 lines with an inline `<style>` block, its own palette, Google Fonts (Carlito), and inline SVG icons.
- Assets are co-located in `assets/` and referenced relatively (`assets/Great_Mental_Models_cover.jpg`).
- All content is hand-written HTML. There is no data layer.
- Added in `#321`, iterated in `#323` and `#325` (print CSS).

**Implication:** the visual language we want to reuse exists only as inline CSS in a static file. It has never been expressed in the theme's LESS system. Reusing it means *porting* it, not *including* it.

---

## Part 2: Anatomy of the TAK "Reading" Sections

Two sibling components, both inside `.section > .section-inner > .section-head + grid`.

### 2a. Bookshelf: "Read These Next" (`.shelf` / `.book`)

```html
<a class="book" href="{amazon url}" target="_blank" rel="noopener">
  <div class="book-cover"><img src="assets/X_cover.jpg" alt="X book cover"></div>
  <h3>Title</h3>
  <span class="cta-chip">Open on Amazon <svg>↗</svg></span>
</a>
```

- Grid: `repeat(auto-fit, minmax(190px, 1fr))`, 32px gap.
- Cover: `aspect-ratio: 2/3`, 8px white border plus 1px `--line` outline, 10px radius, soft shadow, lifts 6px on hover/focus.
- The whole card is the link. Title is an `<h3>`. The CTA chip is a visual affordance, not a separate link.
- Covers are committed JPGs (~29 to 51 KB each) hand-saved into `assets/`.
- Links are Amazon URLs with no affiliate parameters (in the TAK). The blog's v2 adds an affiliate tag; see Part 7. The CTA text names the destination ("Open on Amazon").

### 2b. Article cards: "Read these, to get started today" (`.app-grid` / `.app-card`)

```html
<a class="app-card" href="..." target="_blank" rel="noopener">
  <div class="app-icon" style="background:#E6F5EF"><svg>…</svg></div>
  <h3>Title</h3>
  <ul><li>one-line why-it-matters</li></ul>
  <span class="cta-chip">Read on Improving <svg>↗</svg></span>
</a>
```

- Grid: `repeat(auto-fit, minmax(230px, 1fr))`, 24px gap.
- Card: white, 1px border, 16px radius, 28px padding, lifts 4px on hover.
- Icon tile: 60px rounded square with a tinted background and an inline stroke SVG. This is **hand-drawn per card**, not fetched. (The promptfoo card embeds that product's own logo SVG.)
- A **one-line annotation** (`<ul><li>`) says why the link matters. This is the hand-curated editorial layer.
- CTA text again names the host ("Read on Improving").

### 2c. Shared traits to preserve

- Entire card is clickable, opens in a new tab, `rel="noopener"`.
- Eyebrow plus H2 plus one-sentence intro per section (e.g. "External Acumen", "Industry Reading").
- Print rules: cards use `break-inside: avoid`, and `a[href]::after` prints the raw URL under the card.
- No runtime JS. No network fetches for icons or covers.
- Reduced palette: navy `#0B2340`, teal `#5BC2A7`, orange `#FF9300`.

### 2d. Palette mismatch to resolve

The TAK palette (navy/teal/orange, Carlito) is **different** from the blog theme palette in [_variables.less](../../../themes/A%20la%20Clear/source/less/_variables.less) (primary `#0D446D`, terceary `#077445`, accent `#A9650A`, Roboto). The `Brand Bible - scmm.yaml` governs the blog. A ported component should use theme tokens (`#lib.colors[...]`), keeping the TAK's *shape* (cover framing, lift, chip, card layout) but not its hex values.

---

## Part 3: Other Relevant Repo Conventions

| Concern | Convention | Source |
|---|---|---|
| Front matter schema | Documented in `docs/BLOG_POST_STRUCTURE.md`. It currently lists only title/date/tags/description/categories/photos. `used-hotpot`, `canonical_url`, `hideContentWarning`, `subtitle` are **undocumented** | docs |
| Post scaffold | `scaffolds/post.md`: title, categories, tags, date, photos, description | scaffolds |
| Authoring pipeline | `.devin/skills/bpi-to-blog-post` creates the front matter step by step with `[TBD]` placeholders. Any new field needs a step here, or it is hand-added | skills |
| Image library | `source/img/post_img/` plus `image-index.json` (AI-described, used for header image selection). Header images only, not suited for covers | `_scripts/`, skills |
| Internal link format | `/blog/<slug>/` | BLOG_POST_STRUCTURE.md |
| Build-time data | Hexo has `source/_data/` and `scripts/` for generators and helpers. **Neither exists in this repo yet** | hexo skill |
| Theme icons | `themes/A la Clear/source/images/` holds a few single-colour social SVGs (github, linkedin, rss, etc.). No Wikipedia, Amazon or generic link icon | theme |
| Existing "Read Next" | [sidebar.ejs](../../../themes/A%20la%20Clear/layout/_partial/articles/sidebar.ejs) has three **hardcoded** post links, last updated 2024-12-22. Different purpose (site-wide, not per-post). The new section's name should not collide with it | theme |

---

## Part 4: Clarifying Intent

Restating intent as I understand it, so you can correct it:

1. **Purpose:** point readers at *source material the post is built on*, not at things the post already links inline. It is enrichment, not citation.
2. **Scale:** "a small handful", roughly 2 to 5 items, end of post.
3. **Authoring model:** hand-curated per post in front matter, like Hotpot. Not auto-generated or auto-matched.
4. **Rendering model:** build-time only, static, no JS, no runtime fetches. Same as the TAK.
5. **Look:** the TAK's card language, adapted to the blog's own theme tokens.
6. **Icon logic:** the *type* of link picks the visual (cover, site icon, or brand icon), ideally with little per-link effort from you.

---

## Part 5: Decision Points

Each has a recommendation. These are the choices that shape the front matter format.

### D1. Section name and front matter key

The user-facing heading and the YAML key can differ.

- **Recommended:** key `further_reading` (snake_case matches the existing `canonical_url`/`photos` style closest. Hotpot's kebab-case `used-hotpot` is a boolean flag, not a data key). Heading text "Further Reading".
- Alternatives: `recommended_reading`, `read_next` (collides in meaning with the sidebar's "Read Next").

### D2. Front matter shape

An array of objects, which is new for this repo. Proposed:

```yaml
further_reading:
  - title: The Great Mental Models
    url: https://www.amazon.com/...
    type: book                       # book | post | wikipedia | github | link
    cover: great-mental-models.jpg   # book only
    note: Why this matters in one line   # optional
```

Intent for fields: `title` and `url` required, everything else optional. `type` could be **inferred from the URL** (amazon.com → book, `/blog/…` → post, wikipedia.org → wikipedia, github.com → github, else generic), with an explicit `type` as override.

- **Recommended:** infer `type` from the URL, allow explicit override, and allow a bare-string shorthand (`- /blog/some-post/`) for internal posts, since Hexo can look up the title.

### D3. Where book covers live

- **(a) Co-located per post:** simple, but the repo already has a flat `post_img/`, and covers could pollute `image-index.json` generation.
- **(b) New dedicated dir, e.g. `source/img/covers/`:** keeps them out of the AI image-index pipeline, and covers are reusable across posts.
- **(c) Fetch from Open Library by ISBN at build time:** zero manual work, but it adds a network dependency to `hexo generate` and the CSP-free static output.
- **Recommended: (b)**, with the front matter referencing a filename, and a text fallback if the file is missing. It matches the TAK (committed JPGs) and keeps builds offline and deterministic. (c) is a possible later enhancement.

### D4. Where site/brand icons come from

- **Internal posts:** use the post's own `photos` thumbnail or the site favicon. The post `photos` image is the more informative option.
- **External brands:** a small committed icon set (SVG), mapped by hostname: Wikipedia, GitHub, YouTube, Amazon fallback, plus a generic "link" glyph. Hosts not in the map get the generic glyph.
- **Recommended:** committed SVG set in `themes/A la Clear/source/images/`, keyed by hostname, matching the existing social icon files. No remote favicon services (privacy, offline builds).

### D5. Layout: one component or two

The TAK has two visual treatments, shelf (tall covers) and card (icon tile plus note).

- **Recommended:** one section, one grid, where each item renders as the *book* treatment if it has a cover and the *card* treatment otherwise. This avoids authors having to group by type.
- Alternative: two separate keys, `books` and `links`.

### D6. Heading / intro copy

TAK sections have an eyebrow, H2, and a sentence of intro. For a post-end section I recommend a fixed heading ("Further Reading") and an optional per-post `further_reading_intro` string. I would not carry over the eyebrow.

### D7. Placement

After `</article>`, same slot as `hotpot`, but **before** the attribution and post-nav. It should be a sibling partial, `_partial/articles/further-reading.ejs`, with its own guard, following Pattern A.

### D8. Process integration

Do we also update, as part of this feature:

- `docs/BLOG_POST_STRUCTURE.md` (document the new field plus the currently undocumented ones)?
- `bpi-to-blog-post` skill (add an optional "further reading" step)?
- `scaffolds/post.md` (add a commented-out example)?

**Recommended:** yes to the doc and scaffold. The skill step can follow later.

### D9. Print behaviour

The TAK has careful print CSS. The blog theme has none for posts. Recommended: out of scope, but make the card markup print-friendly (`break-inside: avoid`).

---

## Part 6: Questions for You

Things I can't infer from the code:

1. **Source of the list:** hand-written per post, or do you expect the BPI skill to propose entries?
2. **Annotations:** do you want the one-line "why read this" on every item, as in the TAK cards, or only sometimes?
3. **Amazon links:** plain links like the TAK, or will affiliate tags ever be added? This affects whether the URL is stored as-is.
4. **Internal posts:** show the post's header image, or the site logo/favicon? You said "website icon", so I want to confirm.
5. **Minimum bar for v1:** are books + internal posts + a generic external link enough, with Wikipedia/GitHub icons coming next?
6. **Back-catalogue:** should I add this to any existing posts as a first example, or just to the new `_scratch` post?

---

## Next Steps (once the format is agreed)

1. Lock D1 to D8, and answer the questions above.
2. Add the partial, include it in `post-content.ejs`, and add LESS (`_further-reading.less`, imported in `style.less`).
3. Add the icon set and the covers directory.
4. Update the docs and scaffold.
5. Verify with one sample post through `npm run generate`.

---

## Decisions (2026-11-04)

- Source: the BPI note's `## Further Reading` list, parsed by the workflow (`further-reading.js`, step 2). Hand-written front matter also works.
- Key `further_reading`; item = `title`, `url`, optional `note`; `type`/`cover`/`image` filled by the workflow.
- Covers: `source/img/covers/<title-slug>.jpg`, fetched deterministically by `07b-fetch-link-assets.js` (Amazon, then Open Library). Placed before `generate-post` because the cover filenames go into front matter; `commit-post` adds the covers folder.
- Internal posts use the target post's `photos` image. Other links use `images/link.svg`; Wikipedia/GitHub icons are a later enhancement.
- Every item may carry a note; most won't.
- Test input: `_scratch/202611041200 - BPI - Work Rot Further Reading Test.md`.

---

## Part 7: Amazon Affiliate Links (v2)

**Added:** 2026-11-25

### Goal

Book items in the Further Reading section link to Amazon through the author's Associates account. The author writes any ordinary Amazon link in the BPI note. The workflow extracts the ASIN and builds the affiliate URL. Nobody pastes tracking parameters by hand.

### Link format

The format comes from Amazon's own guidance for a simple text link, as quoted in the Stack Overflow answer to [How to get Amazon affiliate product URL programmatically](https://stackoverflow.com/questions/44329850/how-to-get-amazon-affiliate-product-url-programatically). The answer says it was current as of July 2023, so recheck it if links stop tracking.

```
https://www.amazon.com/dp/<ASIN>/ref=nosim?tag=<ASSOCIATE_ID>
```

- `ASIN` is the 10-character product code. For books it equals the ISBN-10.
- `ASSOCIATE_ID` is the Associates store ID, for example `name-20`.
- The thread's example uses `http://`. We use `https://`, since Amazon redirects and the blog is served over HTTPS.
- Amazon says this format qualifies for the direct link bonus.

### Inputs

| Input | Source | Notes |
|---|---|---|
| Associate ID | env var `AMAZON_AFFILIATE_TAG`, set in `.envrc` (gitignored) | `.envrc.example` documents it. The ID is not a secret (it appears in every published link), but it is config, so it stays out of the repo and out of the BPI note |
| Original URL | `## Further Reading` list in the BPI note | Any of the Amazon forms below |
| ASIN | parsed from the original URL by `amazonAsin()` | Programmatic only. The author never types it separately |

### Behaviour

1. **Extract:** the ASIN is parsed from the author's link. Supported path forms are `/dp/`, `/gp/product/`, `/product/`, `/o/asin/`, `/exec/obidos/asin/` and `/exec/obidos/ASIN/`, and the slug-prefixed `/<title-slug>/dp/<ASIN>`.
2. **Build:** `affiliateUrl(url, tag)` returns the canonical URL above. All other query parameters and path segments are dropped. This strips any existing `tag=`, `ref=`, `th=` and `psc=` values, so a foreign affiliate tag never survives into the post.
3. **Store:** in the post front matter, `url` holds the affiliate URL. The author's original is kept as `source_url`, so the source is traceable and the tag can be recomputed later. The workflow also sets `affiliate: true` on the item.
4. **Tag unset:** this is a warning, not a failure. The item gets the plain canonical URL (`https://www.amazon.com/dp/<ASIN>`, no tag) and `affiliate` is not set. This matches the existing rule that publishing does not hinge on optional enrichment.
5. **Invalid tag:** the tag must match `^[a-z0-9][a-z0-9-]*-\d{2}$`. A malformed value is an error.
6. **Non-book Amazon links:** any `/dp/<ASIN>` link is classified as `book` today, which also decides whether a cover is fetched. This is unchanged. The affiliate rule applies to every item that has an ASIN.
7. **Not Amazon:** non-Amazon and internal links are never modified.

### Rendering

- Affiliate links get `rel="sponsored noopener"` and `target="_blank"`. Other external links keep `rel="noopener"`.
- When any item has `affiliate: true`, the section shows one disclosure line, for example: "As an Amazon Associate I earn from qualifying purchases." Amazon requires a disclosure.
- The CTA chip still reads "Open on Amazon".

### Covers in the commit

- `commit-post` stages only the cover files named by this post's `further_reading` items, not the whole `source/img/covers/` folder. Stray files from other runs are not swept in.
- A `cover` named in the front matter but missing on disk fails the commit step.
- Covers are shared across posts and reused, never re-downloaded. A cover already tracked by git is simply not re-added.

### Decisions (2026-11-25)

- **Q3 (affiliate tags) is answered:** yes, computed at build-workflow time from an env var.
- **Marketplace:** `amazon.com` only. Links on other Amazon domains are rewritten to the `amazon.com` canonical form. *Provisional:* revisit if regional tags are needed.
- **Short links** (`amzn.to`, `a.co`): rejected with a clear error asking for the full product URL. We do not follow redirects in the workflow. *Provisional.*
- **Backfill:** new posts only. Existing posts keep their current links.
- **Cover filenames:** a short slug of the title, not the ASIN. Rule: cut the title at the first `:` (drops the subtitle), slugify, keep at most the first 4 words. Examples: `The Pragmatic Programmer: Your Journey…` → `the-pragmatic-programmer.jpg`, `Working Effectively with Legacy Code` → `working-effectively-with-legacy.jpg`, `Thinking, Fast and Slow` → `thinking-fast-and-slow.jpg`. This replaces the full-title slug from v1. Two editions that share a short title share a cover file (reuse wins). Known case: `the-phoenix-project.jpg` is ASIN `1942788290`, while the seed BPI links `1950508943`.
- **Cap of 5:** the first 5 entries in the Further Reading list are kept, in order. Extras are dropped, never the user's order rearranged. The workflow logs a `WARN` naming the dropped titles. The user is trusted to trim the list themselves. This replaces the old ">5 is a validation warning" behaviour: the cap is now enforced at step 2.
- **Wikilinks:** a `[[Wikilink]]` line inside the Further Reading section is skipped with a `WARN` instead of failing the parse, and does not count toward the cap. Wikilinks in the Hemingway draft body are left as they are, also with a `WARN`. The user is trusted to repair them.

### Out of scope

- Amazon Product Advertising API or Creators API (not needed to build a link).
- Price, availability or rating display.
- Multiple marketplaces or per-region tags.

### Test data

Fixtures live in `_scratch/workflow/fixtures/`:

- `affiliate-urls.json`: table of input URL, expected type, ASIN, and expected URL with and without a tag, including the 8 real URLs from the seed BPI.
- `202611120914 - BPI - AI Problems Are Old Problems.md`: the seed example of a real input (8 books, no notes).
- `202611251200 - BPI - Affiliate Links Test.md`: shaped like the seed, with URL variants, a non-Amazon link, an internal post, a wikilink line, and 9 candidates so the cap fires.
- `affiliate-bpi-expected.json`: expected items, dropped titles and WARNs for both BPIs.
- `../further-reading.test.js`: `node --test further-reading.test.js`.
