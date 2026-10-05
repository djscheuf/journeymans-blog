# Hexo Upgrade Report: Journeyman's Travels

**Date:** 2026-10-05
**Scope:** Hexo core, all `hexo-*` plugins declared in `package.json`, the `A la Clear` theme, and the site's `_config.yml`.
**Status:** Research and trial builds only. The repository was not modified. Trial builds ran in a scratch directory.

Written for: the site owner, to plan and execute the upgrade.

---

## 1. Summary

The upgrade is **feasible and low risk**. The site builds on Hexo 8.1.2 with only two intentional changes:

1. The RSS feed changes format (plugin v3 → v4).
2. Some tag and sitemap entries list in a different order.

No theme changes are required. The theme uses only core helpers, and it contains no custom Hexo scripts or helpers.

The one item that needs action beyond the version bump is **`hexo-generator-seo-friendly-sitemap`**. It was last published in June 2022, it bundles `ejs` 2.6.1, and npm audit reports it as a critical advisory with no fix. The recommended replacement is the maintained `hexo-generator-sitemap`. It is not a drop-in swap, because it produces a single sitemap file (see §5.5).

**Node.js:** Hexo 8 requires Node ≥ 20.19.0. The repo pins `v24.14.1` in `.nvmrc`, and the local Node is v24.21.0, so no runtime change is needed.

**Effort:** About one focused session. Most of the effort is verifying the feed and sitemap.

---

## 2. Verification performed

All checks ran in scratch copies of the repository (`node_modules`, `.git` and `public/` excluded). The real repo was not changed.

| Trial | What was tested | Result |
|---|---|---|
| Baseline | Current lockfile, `hexo clean && hexo generate` | Exit 0, 1038 files, 0 warnings |
| Step A | Hexo core `7.3.0 → 8.1.2`, all plugins left at current versions | Exit 0, 1038 files, 0 warnings. `rss2.xml` identical to baseline. Only tag-ordering and HTML-entity differences (see §4.2) |
| Step B | Full target set: Hexo 8.1.2, feed 4.0.0, index 4.0.0, markdown-it 7.1.1 | Exit 0, 1038 files, 0 warnings. 25 generated files differ after normalising the generator string (see below) |
| Step C | Replace sitemap plugin with `hexo-generator-sitemap` 3.0.1 (on top of Step B) | Exit 0. Produces one `sitemap.xml` with 770 URLs, versus four split files before |

Breakdown of the 25 differing files in Step B:
- **21** are order-only changes (same lines, different order): tag lists on posts and pagination pages, and tag, page and post sitemaps.
- **3** are entity-only changes: inline code such as `&#123;Object&#125;` now renders as `{Object}`. Visually identical in a browser.
- **1** is the RSS feed (`rss2.xml`), a real format change covered in §5.2.

Not tested in the sandbox: `hexo server` (serving), `hexo deploy` (it would push to GitHub), and the `rimraf` 6 change. These are listed as manual checks in §7.

---

## 3. Current vs target versions

| Module | Type | Current (repo) | Latest (npm, 2026-10-05) | Target | Change | Compatibility with target |
|---|---|---|---|---|---|---|
| `hexo` | core | 7.3.0 | 8.1.2 | **8.1.2** | Major | Requires Node ≥ 20.19.0. Verified |
| `hexo-renderer-markdown-it` | renderer | 7.1.0 | 7.1.1 | **7.1.1** | Patch | Verified (in Step B) |
| `hexo-generator-feed` | generator | 3.0.0 | 4.0.0 | **4.0.0** | Major | Requires Node ≥ 20.19.0. Output format changes. Verified |
| `hexo-generator-index` | generator | 3.0.0 | 4.0.0 | **4.0.0** | Major | Requires Node ≥ 18. Pagination output unchanged. Verified |
| `hexo-generator-seo-friendly-sitemap` | generator | 0.2.1 | 0.2.1 (last release 2022-06) | **Replace** with `hexo-generator-sitemap` 3.0.1 | Replacement | Old plugin still works on Hexo 8, but carries a critical advisory. Replacement works, with output changes. See §5.5 |
| `hexo-deployer-git` | deployer | 4.0.0 | 4.0.0 | 4.0.0 | None | Already latest. Not run (would push) |
| `hexo-generator-archive` | generator | 2.0.0 | 2.0.0 | 2.0.0 | None | Already latest. Verified (archive pages build) |
| `hexo-generator-tag` | generator | 2.0.0 | 2.0.0 | 2.0.0 | None | Already latest. Verified (tag pages build) |
| `hexo-canonical-link` | helper | 2.0.0 | 2.0.0 (last release 2022-05) | 2.0.0 | None | Works. Canonical tags unchanged in output |
| `hexo-renderer-ejs` | renderer | 2.0.0 | 2.0.0 | 2.0.0 | None | Already latest. Verified |
| `hexo-renderer-less` | renderer | 4.0.0 | 4.0.0 | 4.0.0 | None | Already latest. CSS output unchanged |
| `hexo-server` | server | 3.0.0 | 3.0.0 | 3.0.0 | None | Already latest. Not run in sandbox |
| `rimraf` (dev) | tool | 5.0.5 | 6.1.3 | 6.1.3 (optional) | Major | Requires Node 20 or ≥ 22. Used by `npm run clean`. Not run |

Only `hexo`, `hexo-generator-feed`, `hexo-generator-index`, `hexo-renderer-markdown-it`, the sitemap plugin, and `rimraf` need changes. The rest are already at their latest release.

---

## 4. Theme and configuration review

### 4.1 Theme (`themes/A la Clear`)

The theme needs **no changes** for Hexo 8:

- Template helpers used are all core: `partial`, `url_for`, `css`, `js`, `__`.
- The theme has no `scripts/` directory, so it defines no custom helpers or filters. The Hexo 8 change that binds helpers to `hexo` (#5555) does not affect it.
- Config keys read by the theme (`title`, `subtitle`, `url`, `root`, `social`, `nav`, `widget`, `logo`, `favicon`, `google_analytics`, `mailerlite`, `highlight.line_number`, `date_format`, `language`) are all still supported in Hexo 8.
- It reads `site.posts` and `page.*` fields only. It does not call `hexo.locals.get('posts')`, whose return value changed in Hexo 8 (#5612).

### 4.2 Hexo 8 behaviour changes that affect this site

| Hexo 8 change | Affects this site? | Evidence |
|---|---|---|
| Node ≥ 20.19 required | Environment only | Local Node v24.21.0. `.nvmrc` v24.14.1 |
| Stricter config file extensions for `--config` | No | The site does not pass `--config` |
| `url` is validated | Passes | `https://daniel.scheufler.tech` is valid |
| Helpers bound to `hexo` | No | No custom helpers |
| Tag and category lookups are faster (binary relation index, #5605) | Yes, cosmetic | Tag lists on posts now list in a different order |
| Code spans HTML-escaping (#5688) | Yes, cosmetic | `&#123;` now renders as `{`. Same visual result |
| `open_graph` tag ordering (#5656) | Not observed | No differences in `<head>` meta beyond the generator string |

### 4.3 Configuration items to tidy

| Item | Finding | Recommendation |
|---|---|---|
| `email` (`_config.yml`) | `daniel@shceufler.tech` has a typo in the domain (`shceufler` vs `scheufler`) | **Fix before the feed upgrade.** In feed v4 this address is published in every RSS item as `<author>`, and it also drives the feed's gravatar icon |
| `package.json` `authors.email` | Same typo | Fix at the same time |
| `highlight.enable` | Dead config since Hexo 7 (replaced by `syntax_highlighter`). Hexo 8 ignores it | Remove `enable`. Keep `line_number`. Optionally set `syntax_highlighter: highlight.js` explicitly |
| `highlight.tab_replace:` (empty) | Parsed as `null`. Hexo 8 default is `''` | Harmless. Set to `''` for clarity |
| `feed:` block | `type: rss2`, `path`, `limit` all still valid in v4. `template` not set | No change needed |
| `sitemap:` block | Used only by the old sitemap plugin | Update if the plugin is replaced (§5.5) |
| `package.json` `"hexo": {"version": "7.3.0"}` | Version marker | Update to `8.1.2` after the upgrade |
| `_scripts/*.js` | Standalone Node scripts, not Hexo plugins | Not affected |

---

## 5. Upgrade sequence by module

Run the steps in this order. Each step is one commit, so each one can be reverted on its own. Run `npm run regen` and compare against a saved copy of `public/` after every step.

### Step 0: Prepare (no version change)

1. Confirm Node ≥ 20.19 in the shell you build from: `node -v`.
2. Save a copy of the current generated site for diffing: `cp -r public ../public-baseline`. `public/` is gitignored.
3. Fix the `email` typo in `_config.yml` and `package.json` (§4.3). This changes the feed's `<author>` and icon, so it is safest to do it as its own commit.

`db.json` is a gitignored cache. `hexo clean` (run by `npm run regen`) rebuilds it, so it does not need to be backed up.

### Step 1: Hexo core `7.3.0 → 8.1.2`

**Module:** `hexo`

- Command: `npm install hexo@^8.1.2`
- Code changes: none.
- Config changes: none required. Optionally tidy `highlight` (§4.3).
- Verified: Exit 0, 0 warnings. The only changes are tag-order and entity-encoding differences. `rss2.xml` is byte-identical to baseline.
- Risk: Low.

### Step 2: `hexo-renderer-markdown-it` `7.1.0 → 7.1.1`

**Module:** Markdown renderer

- Command: `npm install hexo-renderer-markdown-it@^7.1.1`
- Code changes: none. The site has no `markdown:` config block, so the renderer defaults apply.
- Verified: Included in the full-target trial (Step B). Not tested alone.
- Risk: Low. Patch release.

### Step 3: `hexo-generator-index` `3.0.0 → 4.0.0`

**Module:** Index / pagination generator

- Command: `npm install hexo-generator-index@^4.0.0`
- Behaviour change: the pagination directory now reads `index_generator.pagination_dir` first, then `pagination_dir`. The site uses `pagination_dir: page`, so output is unchanged.
- Code changes: none.
- Verified: Paginated pages (`page/5/`, `page/14/`, etc.) match baseline apart from tag ordering.
- Risk: Low.

### Step 4: `hexo-generator-feed` `3.0.0 → 4.0.0`

**Module:** RSS feed

- Command: `npm install hexo-generator-feed@^4.0.0`
- Config: keep `feed: { type: rss2, path: rss2.xml, limit: 10 }`. The `template` option was removed in v4, but the site does not use it.
- Behaviour changes in the feed (verified in `rss2.xml`):
  - The channel now includes `<description>` (from `subtitle`), `<language>`, `<copyright>`, `<lastBuildDate>` and `<generator>Hexo</generator>`.
  - Each item now includes `<author>` with the `email` from `_config.yml`. This is why the typo fix in Step 0 matters.
  - Apostrophes in descriptions are no longer escaped as `&#39;`. The XML is still valid.
  - Full-content (`content:encoded`) is unchanged.
- Verify: validate the output with a feed validator (for example W3C Feed Validation Service) after deploying a test build.
- Risk: Medium. This is the only intentional content change on the site.

### Step 5: Replace the sitemap plugin

**Module:** Sitemap (`hexo-generator-seo-friendly-sitemap` → `hexo-generator-sitemap`)

Why: the current plugin (0.2.1) was last published in June 2022. It depends on `ejs` 2.6.1, which has a critical advisory with no fix, and on `lodash` 4.17.12. npm audit reports the plugin itself as critical.

Command:
```bash
npm uninstall hexo-generator-seo-friendly-sitemap
npm install hexo-generator-sitemap@^3.0.1
```

Behaviour changes (verified in the trial):
- Output changes from a sitemap index plus `post-sitemap.xml`, `page-sitemap.xml` and `tag-sitemap.xml` to one `sitemap.xml` with 770 URLs.
- The new plugin includes the JSON data files in `img/post_img/` (`image-index.json`, `recent-images.json`, and the description JSON). Exclude them, for example by using the plugin's options or by moving the files out of `source/`. This needs a decision on your side.

Config: review the `sitemap:` block in `_config.yml` against the new plugin's options before committing.

Alternative: keep the old plugin for now. It still builds on Hexo 8 (verified in Step B), so this step can be deferred. The security advisory is the main reason to do it.

Risk: Medium. Output structure changes, and SEO tools will see a new sitemap layout.

### Step 6: `rimraf` `5.0.5 → 6.1.3` (dev dependency, optional)

**Module:** `rimraf` (used by `npm run clean`)

- Command: `npm install -D rimraf@^6.1.3`
- Requires Node 20 or ≥ 22. The local Node (v24) qualifies.
- Verified: Not run. Confirm `npm run clean` removes `public/`.
- Risk: Very low.

### Step 7: Finalise

1. Update `package.json` `"hexo": {"version": "8.1.2"}`.
2. Regenerate the lockfile: `rm -rf node_modules && npm install`.
3. Run `npm run regen` and diff against `../public-baseline`. Expect only the changes listed in §5.
4. Run `npm start` and check the home page, a post, archives, a tag page, the RSS feed and the sitemap in a browser.
5. Commit `package.json` and `package-lock.json`.

---

## 6. Security posture

Production-dependency audit (`npm audit --omit=dev`):

| State | Total | Critical | High |
|---|---|---|---|
| Current lockfile | 22 | 2 | 11 |
| After Step 5 (sitemap replaced) | 26 | 0 | 18 |

The critical findings in the current tree are `hexo-generator-seo-friendly-sitemap` and its bundled `ejs` 2.6.1. Step 5 removes both.

The high count goes up after Step 5 because the new dependency tree brings in more transitive packages. Many of these advisories are against `hexo`, `hexo-cli` and `hexo-fs`. Their suggested fixes are downgrades (for example `hexo@3.9.0`) and **should not be applied**. The high findings need triage before the upgrade is considered closed. Two come from `hexo-renderer-markdown-it`, which has no fix at the current major: `markdown-it` and `linkify-it`. These run at build time on your own content, so exposure is limited, but they should be recorded.

The build also prints a `DEP0169` `url.parse()` deprecation warning from a dependency. It is informational and does not affect output.

---

## 7. Manual checks not covered by the sandbox

- `hexo server`: start it and load home, a post, archive and tag pages. The sandbox did not run the server.
- `hexo deploy`: deployer 4.0.0 is already the latest, but the sandbox did not run it because it would push to GitHub. Verify on a branch first.
- Feed: validate the new `rss2.xml`.
- Google Analytics and MailerLite embed scripts: confirm they still load (the theme code is unchanged).
- Images: `_scripts/` output and `img/` are unchanged by the upgrade.

---

## 8. Recommended commit plan

| # | Commit | Reversible alone |
|---|---|---|
| 0 | Fix `email` typo in `_config.yml` and `package.json` | Yes |
| 1 | `hexo` → 8.1.2 | Yes |
| 2 | `hexo-renderer-markdown-it` → 7.1.1 | Yes |
| 3 | `hexo-generator-index` → 4.0.0 | Yes |
| 4 | `hexo-generator-feed` → 4.0.0 | Yes |
| 5 | Replace sitemap plugin (or defer) | Yes |
| 6 | `rimraf` → 6.1.3 (optional) | Yes |
| 7 | Version marker and lockfile regen | Yes |

Commands for the bumps, run in this order:

```bash
npm install hexo@^8.1.2
npm install hexo-renderer-markdown-it@^7.1.1
npm install hexo-generator-index@^4.0.0
npm install hexo-generator-feed@^4.0.0
npm uninstall hexo-generator-seo-friendly-sitemap && npm install hexo-generator-sitemap@^3.0.1
npm install -D rimraf@^6.1.3
```

---

## 9. Decisions

Decided by the owner on 2026-10-05:

1. **Sitemap:** replace `hexo-generator-seo-friendly-sitemap` with `hexo-generator-sitemap` 3.0.1 (Step 5).
2. **Sitemap contents:** exclude the JSON data files under `source/img/post_img/` from the sitemap. Implemented with `skip_render` globs, which the sitemap plugin honours. The files are still published to `public/`.
3. **Email:** the corrected address `daniel@scheufler.tech` is set in `_config.yml`, and the typo in `package.json` `authors.email` is fixed in Step 0.

Decided by the assistant, to be reviewed:

4. **rimraf:** upgrade to 6.1.3 (Step 6). It is a dev-only tool, Node 24 satisfies its requirement, and the owner did not object to the optional upgrade.

Not in scope for this upgrade, noted for later: the sitemap also lists the generated `img/post_img/descriptions/*.html` pages, because the plugin includes every rendered page. Excluding them is a separate decision.

Each step is staged, not committed. Staged changes are reviewed and committed by the owner.
