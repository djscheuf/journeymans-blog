# Upgrading Hexo

Version requirements and the 7.x → 8.x path (this repo is on hexo 7.3.0). Sources: https://hexo.io/docs/ (Node version table) · https://hexo.io/news/2025/09/16/hexo-8-0-0-released/ · https://github.com/hexojs/hexo/releases/tag/v8.0.0

## Node.js version requirements

| Hexo | Minimum Node | Max Node |
|---|---|---|
| 8.0+ | **20.19.0** | latest |
| 7.0+ | 14.0.0 | latest |
| 6.2+ | 12.13.0 | latest |
| 6.0+ | 12.13.0 | 18.5.0 |
| 5.0+ | 10.13.0 | 12.0.0 |

No bugfixes are provided for past Hexo versions; run the latest Hexo + recommended Node where possible.

## Hexo 7.3.0 → 8.x

Released: 8.0.0 (2025-09-16), 8.1.0 (2025-10-26). Scope was originally "7.4.0" — most changes are additive/perf; only two true breaking changes.

### Breaking changes
1. **Dropped Node.js 16** (#5592) and **Node.js 18** (#5674) → **Node ≥ 20.19.0 required.** Check the runtime/CI/deployment environment before bumping.
2. **Stricter config file extension checks** in `load_config` (#5591) — config files passed via `--config` must have proper `.yml`/`.yaml`/`.json` extensions.

### Behavior-affecting changes to verify after upgrade
- `url` config is now **validated** (#5578) — a malformed/missing `url` in `_config.yml` may now error.
- Helper functions are now called with hexo bound as context (#5555) — custom helpers get `this` = hexo (fixes helper-in-helper patterns; check any helper that relied on unbound `this`).
- New permalink variable `:timestamp` (#5611); backtick code blocks accept additional options (#5625).
- Fixes that may change output: `hexo.locals.get('posts')` now returns all posts (#5612); code-block parsing inside list items (#5617); open_graph tag ordering (#5656); HTML-escaped `title` in `code`/`include_code` tags (#5688, security fix).
- Perf: binary relation index for categories/tags (#5605), `listArchives` caching, faster external_link filter, tag render skipped when no swig tags, warehouse 6.

### Upgrade steps for this repo
1. Verify Node ≥ 20.19.0 locally and wherever build/deploy runs.
2. `npm install hexo@^8` — then bump official plugins to their 8-compatible majors as needed (check each `hexo-*` dep: deployer-git, generator-*, renderer-*; plugin compat is declared via peer/engine ranges).
3. Sanity-check `_config.yml`: valid `url`, proper file extension on any `--config` files.
4. `npm run regen` (clean + generate) and diff `public/` for unexpected output changes (helpers context, posts list, code blocks).
5. Commit `package.json`/`package-lock.json` and the `"hexo": {"version": ...}` marker update.

### Older breaking changes worth knowing (≤7.x)
- v7.0.0: `syntax_highlighter` replaced `highlight.enable`/`prismjs.enable`; `use_date_for_updated` removed (use `updated_option`); `youtube`, `vimeo`, `gist`, `jsfiddle` tag plugins deleted.
- v5.0.0: Lodash removed from template globals; `_config.<theme>.yml` support added.

## Migrating content *from other platforms* (different topic)

`hexo migrate <type>` + plugins: `hexo-migrator-rss`, `hexo-migrator-wordpress`, `hexo-migrator-joomla` (J2XML export). Jekyll/Octopress: just move `_posts` files and set `new_post_name: :year-:month-:day-:title.md`. See https://hexo.io/docs/migration.
