# Hexo Core System

How a Hexo site is structured, configured, and generated. Source: https://hexo.io/docs/ (setup, configuration, commands, writing, front-matter, asset-folders, data-files, server, generating).

## Project layout (`hexo init <folder>`)

```
.
├── _config.yml      # site configuration
├── package.json     # dependencies; hexo plugins are npm packages named hexo-*
├── scaffolds/       # templates for `hexo new` (placeholders: layout, title, date)
├── source/
│   ├── _drafts/     # drafts (not rendered unless --draft / render_drafts)
│   └── _posts/      # posts
└── themes/
```

- `source/`: hidden files and `_`-prefixed files/folders are ignored, **except** `_posts`. Renderable files (`.md`, `.html`, ...) are processed into `public/`; everything else is copied verbatim.
- `hexo clean` removes `db.json` (Warehouse cache) and `public/`.

## Generation pipeline

1. Config load (`_config.yml`, or `--config file[,file2]` → merged into `_multiconfig.yml`; later files win, comma-separated, no spaces).
2. Plugin/script load: `node_modules/hexo-*` deps in package.json + `scripts/` + `themes/<theme>/scripts/`. `--safe` skips all of them.
3. `load`/`watch`: files in `source/` + theme data → processors → Warehouse data model.
4. Generators produce routes `{path, data, layout}`; renderers + theme templates emit files to `public_dir`.
5. `--watch` regenerates on change using SHA1 checksums (only writes changed files).

## Commands

| Command | Purpose | Key flags |
|---|---|---|
| `hexo init [folder]` | scaffold a new site | |
| `hexo new [layout] <title>` | new article from scaffold | `-p/--path`, `-s/--slug`, `-r/--replace` |
| `hexo generate` | build static files | `-d/--deploy`, `-w/--watch`, `-b/--bail` (fail on unhandled exception), `-f/--force`, `-c/--concurrency <n>` |
| `hexo publish [layout] <file>` | move draft `_drafts` → `_posts` | |
| `hexo server` | local server at :4000 | `-p/--port`, `-s/--static` (serve files only), `-l/--log` |
| `hexo deploy` | deploy via configured deployer | `-g/--generate` |
| `hexo render <file>` | render a file | `-o/--output` |
| `hexo migrate <type>` | import from other platforms | |
| `hexo clean` | delete `db.json` + `public/` | |
| `hexo list <type>` | list routes/data | |
| `hexo config [key] [value]` | read/set `_config.yml` values | |

Global options: `--safe` (no plugins/scripts), `--debug` (verbose + `debug.log`), `--silent`, `--draft`, `--config`, `--cwd`.

`hexo new page --path about/me "About me"` creates `source/about/me.md`; omitting the title makes `page` the title and creates a **post** instead.

## `_config.yml` key settings

**Site**: `title`, `subtitle`, `description`, `keywords`, `author`, `language` (ISO-639-1, default `en`), `timezone`.

**URL**: `url` (must start http/https), `root` (defaults to url pathname — for a subdirectory site set `url: http://example.org/blog` and `root: /blog/`), `permalink` (default `:year/:month/:day/:title/`), `permalink_defaults`, `pretty_urls.trailing_index` / `pretty_urls.trailing_html` (both default `true`).

**Directory**: `source_dir` (source), `public_dir` (public), `tag_dir`, `archive_dir`, `category_dir`, `code_dir` (downloads/code), `i18n_dir` (:lang), `skip_render` (globs copied raw; also usable to exclude a post, e.g. `"_posts/x.md"`).

**Writing**: `new_post_name` (`:title.md`; placeholders `:title :year :month :i_month :day :i_day`), `default_layout` (post), `titlecase`, `external_link` (.enable/.field site|post/.exclude), `filename_case` (0/1 lower/2 upper), `render_drafts`, `post_asset_folder`, `relative_link`, `future` (true), `syntax_highlighter` (v7+: `highlight.js` | `prismjs` | empty).

**Home/index** (`index_generator`, from hexo-generator-index): `.path` (''), `.per_page` (10), `.order_by` (`-date`), `.pagination_dir` (page).

**Category/tag**: `default_category` (uncategorized), `category_map`, `tag_map` (slug overrides, e.g. `"C++": c-plus-plus`).

**Dates** (Moment.js): `date_format` YYYY-MM-DD, `time_format` HH:mm:ss, `updated_option` — `mtime` (default), `date`, or `empty`. (`use_date_for_updated` removed in v7.)

**Pagination**: `per_page` (10; `0` disables), `pagination_dir` (page).

**Extensions**: `theme` (`false` disables theming), `theme_config` (overrides theme `_config.yml`), `deploy`, `meta_generator` (`false` disables the meta generator tag).

**Include/exclude/ignore** (globs): `include`/`exclude` apply to `source/` only; `ignore` applies everywhere incl. `themes/`. Values must be quoted. Cannot exclude posts with `exclude` — use `skip_render` or a `_` prefix.

**Alternate theme config**: `theme_config` in site `_config.yml` (highest priority) > `_config.<theme>.yml` in site root > `themes/<theme>/_config.yml` (lowest). Theme config changes don't require a server restart.

## Writing & front-matter

Layouts: `post` → `source/_posts`, `page` → `source/`, `draft` → `source/_drafts`. `layout: false` skips theme processing but the file is still rendered by its renderer.

Front-matter = YAML (`---` terminated) or JSON (`;;;` terminated) block at top of file. Settings: `layout`, `title` (default: filename), `date` (file creation), `updated`, `comments` (true), `tags`, `categories` (posts only; each entry in a list is an independent hierarchy), `permalink` (must end `/` or `.html`), `excerpt`, `disableNunjucks`, `lang`, `published` (true in `_posts`, false in `_drafts`).

- Posts may be written in any format with a matching renderer plugin — the file extension picks the renderer (`.md` → markdown renderer, `.ejs` → ejs).
- Tag plugins (Nunjucks `{% %}` / `{{ }}`) always run regardless of layout unless `disableNunjucks` or the renderer disables them.

## Asset folders & data files

- Global assets: put in e.g. `source/images`, reference as `/images/x.jpg`.
- `post_asset_folder: true`: `hexo new` creates a same-named folder next to the post; reference assets with `{% asset_path slug %}`, `{% asset_img slug [title] %}`, `{% asset_link slug [title] %}`. Plain `![](x.jpg)` relative paths break on index/archive pages (work inside the post only). With hexo-renderer-marked ≥3.1: `marked: {prependRoot: true, postAsset: true}` makes plain markdown image syntax resolve post assets.
- `source/_data/*.yml|json` → available in templates as `site.data.<name>`.

## Built-in tag plugins (excerpt)

`blockquote`/`quote`, `codeblock`/`code` (opts `lang:`, `line_number`, `first_line`, `mark`, `wrap`...), backtick code block (``` fenced with same options), `pullquote`, `iframe`, `img`, `link`, `include_code`, `post_path`/`post_link`, `asset_path`/`asset_img`/`asset_link`, `url_for`, `full_url_for` (7.0+), `raw` (escape `{{ }}`), `youtube`/`vimeo`/`gist`/`jsfiddle` **removed in v7.0.0**.
