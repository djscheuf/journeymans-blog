---
description: Hexo static blog framework — core generation pipeline, configuration, plugin/extension system, customization, debugging generation issues, and upgrading (7.x → 8.x). Consult when working on this Hexo site or its plugins/theme.
---

# Hexo Overview

Hexo is a fast static site/blog framework for Node.js. Posts are written in Markdown (or any format a renderer plugin supports), combined with a theme's templates, and emitted as static files into `public/`.

**How generation works (high level):**
1. `hexo` CLI loads `_config.yml`, then loads plugins (`node_modules/hexo-*` packages listed as dependencies) and any `*.js` files in `scripts/` (site and theme).
2. Processors scan `source/` and the theme's `source/` into an in-memory Warehouse database (`db.json` cache).
3. Renderers convert each renderable file (e.g. `.md` → HTML) according to file extension.
4. Generators build routes (`path` + `data` + optional `layout`) from the processed data.
5. Theme templates (EJS/Nunjucks/etc. by extension) render the routes; output is written to `public_dir` (`public/`).

**Reach for this skill when:** changing site config, adding posts/pages, writing or debugging plugins/scripts/themes, fixing generation errors, or upgrading Hexo.

- CLI: `npx hexo <command>` (init, new, generate, publish, server, deploy, render, clean, list, config). Global flags: `--safe` (no plugins/scripts), `--debug` (verbose log + `debug.log`), `--draft`, `--config <file(s)>`, `--cwd`, `--silent`.
- This repo runs Hexo 7.3.0. Latest major is Hexo 8 (requires Node ≥ 20.19.0).

## Reference Files
- `core-system.md` — project layout, `_config.yml` options, commands, writing/front-matter, asset folders, data files, generation/watch/deploy
- `customization.md` — themes, templates/layouts/partials, template variables, helpers, permalinks, syntax highlighting, i18n
- `plugins.md` — scripts vs plugins, extension API types (renderer, generator, tag, filter, helper, deployer, etc.), publishing
- `troubleshooting.md` — debugging generation issues: `--debug`/`--safe`, YAML errors, EMFILE/OOM, stale cache, template render errors
- `upgrading.md` — Hexo 7.3.0 → 8.x upgrade path, Node version requirements, breaking changes

Sources: https://hexo.io/docs/ · https://hexo.io/api/
