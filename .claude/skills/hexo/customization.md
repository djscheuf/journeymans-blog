# Hexo Customization

Themes, templates, variables, helpers, permalinks, syntax highlighting, i18n. Sources: https://hexo.io/docs/themes · /templates · /variables · /helpers · /permalinks · /syntax-highlight · /internationalization

## Themes

Structure of `themes/<name>/` (or an npm `hexo-theme-*` package):

```
├── _config.yml   # theme config; edits don't need server restart
├── languages/    # i18n files
├── layout/       # templates (engine chosen by extension: .ejs → EJS, .njk → Nunjucks)
├── scripts/      # js loaded at init (same as site scripts/)
└── source/       # theme assets; renderables processed, rest copied to public/
```

Select via `theme: <name>` in site `_config.yml` (`false` disables theming). Override theme config without forking: `theme_config:` in site `_config.yml` or `_config.<theme>.yml` in site root (priority: site `theme_config` > `_config.<theme>.yml` > theme `_config.yml`).

## Templates

Template → page mapping (fallbacks): `index` → home; `post` → posts (→index); `page` → pages (→index); `archive` → archives (→index); `category` (→archive); `tag` (→archive). A theme needs at least `index`.

- `layout` template wraps all others; must output `<%- body %>`. Override per-post via front-matter `layout`, nest layouts by including more layout templates.
- Partials: `<%- partial('partial/header', {title: 'x'}) %>` — second arg passes local vars.
- Fragment caching for slow/static partials: `<%- partial('header', {}, {cache: true}) %>` or `fragment_cache()`. Do **not** use on content that varies per page (e.g. with `relative_link`).

## Template variables

Global: `site`, `page`, `config` (site config), `theme` (theme config), `path`, `url`, `env`. Lodash was removed from globals in Hexo 5.

- `site.posts|pages|categories|tags` — Warehouse **Query objects**, not arrays; use `.toArray()` to iterate.
- `page` (article): `title`, `date`, `updated`, `comments`, `layout`, `content`, `excerpt`, `more`, `source`, `full_source`, `path`, `permalink`, `photos`, `link`, `categories`, `tags`, `published`, plus front-matter extras.
- `page` (index/archive/category/tag): `per_page`, `total`, `current`, `current_url`, `posts`, `prev`/`prev_link`, `next`/`next_link`, `path`. Archive adds `archive`, `year`, `month`; category adds `category`; tag adds `tag`.

## Helpers (templates only, not usable in source files)

- URL: `url_for(path)` (prefixes root; `{relative:bool}`), `relative_url(from,to)`, `full_url_for(path)`, `gravatar(email, opts)`
- HTML: `css`, `js`, `link_to`, `mail_to`, `image_tag`, `favicon_tag`, `feed_tag`
- Conditionals: `is_current`, `is_home`, `is_home_first_page` (6.3+), `is_post`, `is_page`, `is_archive`, `is_year`, `is_month`, `is_category`, `is_tag`
- Strings: `trim`, `strip_html`, `titlecase`, `markdown`, `render`, `word_wrap`, `truncate`, `escape_html`
- Templates: `partial`, `fragment_cache`
- Date/time: `date`, `date_xml`, `time`, `full_date`, `relative_date`, `time_tag`, `moment`
- Lists: `list_categories`, `list_tags`, `list_archives`, `list_posts`, `tagcloud`
- Misc: `paginator`, `search_form`, `number_format`, `meta_generator`, `open_graph`, `toc`

Call a helper inside another helper via `this.<name>()`; from other extensions use `hexo.extend.helper.get('url_for').bind(hexo)`.

## Permalinks

`permalink` setting or post front-matter. Variables: `:year :month :i_month :day :i_day :hour :minute :second :timestamp(8.0+) :title :name :post_title :id :category :hash`. Any front-matter attribute except `:path`/`:permalink` also usable. Defaults per segment via `permalink_defaults`. `:id` is not persistent across cache resets. E.g. `:category/:title/` with categories `foo > bar` → `foo/bar/hello-world/`.

## Syntax highlighting (v7+)

Built-in: highlight.js and prismjs. Select with `syntax_highlighter: highlight.js | prismjs`; empty value disables both (output then controlled by the renderer, e.g. `<code class="yaml">`; use a third-party plugin or browser-side highlighter).

```yaml
syntax_highlighter: highlight.js
highlight:
  auto_detect: false   # guess language when unspecified
  line_number: true
  line_threshold: 0    # only number blocks longer than N lines
  tab_replace: ""
  exclude_languages: [example]
  wrap: true           # wrap in table for copy-friendliness
  hljs: false          # prefix classes with hljs-
prismjs:
  preprocess: true     # false = browser-side prism.js
  line_number: true
  line_threshold: 0
  tab_replace: ""
```

Pre-v7 config used `highlight.enable` / `prismjs.enable` booleans instead of `syntax_highlighter`.

## i18n

- Site: `language` in `_config.yml` (ISO-639-1 code, optionally with variant); `i18n_dir` (default `:lang`) prefixes generated routes per language.
- Theme: YAML files in `themes/<theme>/languages/` named by language code; use `__()` and `_p()` helpers in templates.
- Per-post `lang` front-matter overrides auto-detection.
