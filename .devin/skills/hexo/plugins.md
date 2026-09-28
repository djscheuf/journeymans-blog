# Hexo Plugin System

How Hexo is extended. Sources: https://hexo.io/docs/plugins · https://hexo.io/api/ (+ /api/renderer, /api/generator, /api/tag, /api/filter, /api/helper, /api/deployer, /api/console, /api/processor, /api/injector, /api/locals, /api/events, /api/router).

## Two kinds of extension

**Script** — drop `.js` files in `scripts/` (site) or `themes/<theme>/scripts/` (theme). Loaded at init; use for simple/local extensions. Custom helpers/filters for a site or theme go here.

**Plugin** — npm package in `node_modules` whose name starts with `hexo-`; Hexo ignores other names. Must be listed in the site's `package.json` dependencies to load. Minimum files:

```
├── index.js
└── package.json   # {"name": "hexo-my-plugin", "version": "0.0.1", "main": "index"}
```

Official dev tools: `hexo-fs` (file IO), `hexo-util` (utilities), `hexo-i18n`, `hexo-pagination`. Publish to the plugin list via a yaml entry in `hexojs/site` (`source/_data/plugins/<name>.yml`).

## Loading & the Hexo instance

```js
const Hexo = require("hexo");
const hexo = new Hexo(process.cwd(), {
  debug: false,   // verbose + debug.log
  safe: false,    // load no plugins
  silent: false,
  config: "_config.yml",
  draft: false,   // include drafts in locals.posts
});
hexo.init()                       // loads config + plugins
  .then(() => hexo.load())        // or hexo.watch()
  .then(() => hexo.call("generate", {}))
  .then(() => hexo.exit())        // always exit() — saves db etc.
  .catch(err => hexo.exit(err));
```

## Extension types (`hexo.extend.*`)

### renderer — `hexo.extend.renderer.register(name, output, fn(data, options, callback), sync)`
`name` = input extension, `output` = output extension (lowercase, no `.`). `data` = `{path, text}`. Async: return Promise or use callback; sync mode: pass `sync: true` and return the value. To disable Nunjucks tag processing in a renderer, mark the function with `fn.disableNunjucks = true`.

### generator — `hexo.extend.generator.register(name, fn(locals))`
Builds routes after files are processed. `locals` = site variables (`locals.posts`, `.pages`, `.categories`, `.tags`, `config`, ...). Return object/array of `{path, data, layout}`. `layout` = string or array (first existing wins); omit to serve `data` raw. **Return data, never touch the router directly.** Re-run on every file change in watch mode. Pagination helper:

```js
const pagination = require("hexo-pagination");
return pagination("archives", locals.posts, { perPage: 10, layout: ["archive","index"], data: {} });
```

### tag — `hexo.extend.tag.register(name, fn(args, content), options)`
Implements `{% name args %}` in posts. `options.ends: true` → block tag with `{% endname %}` and `content` arg; `options.async: true` → may return Promise. `hexo.extend.tag.unregister(name)` to replace a built-in. Tags run through Nunjucks regardless of post format.

### filter — `hexo.extend.filter.register(type, fn(data, ...args), priority)`
WordPress-style hooks; chained in order of `priority` (default 10, lower first). Return modified data (no return = unchanged). Inside a filter, `this` is the hexo instance (`this.config`, `this.theme.config`). Execute with `hexo.execFilter(type, data, {context, args})`; remove with `unregister(type, fn)`.

Built-in filter types: `before_post_render`, `after_post_render`, `before_generate`, `after_generate`, `before_exit`, `after_init`, `template_locals`, `new_post_path`, `post_permalink`, `after_render`, `after_clean`, `server_middleware` (hexo-server only).

### helper — `hexo.extend.helper.register(name, fn)`
Template snippets; not accessible from source files. Same `this` context across helpers (call `this.url_for()` inside your helper). Get one programmatically: `hexo.extend.helper.get("url_for").bind(hexo)`.

### deployer — `hexo.extend.deployer.register(name, fn(args))`
`args` merges the `deploy:` value from `_config.yml` with CLI input; powers `hexo deploy`.

### Others
- `hexo.extend.console.register(name, desc, options, fn)` — new CLI commands.
- `hexo.extend.processor.register(pattern, fn)` — handles files in `source`/theme during load.
- `hexo.extend.injector` — inject HTML fragments (`head_end`, `body_end`) into generated pages.
- `hexo.extend.migrator.register` — backs `hexo migrate <type>`.
- Core objects: `hexo.locals` (site data accessors), `hexo.route`/`hexo.router` (routes), `hexo.source_dir`, `hexo.theme_dir`, `hexo.public_dir`, `hexo.log`, events via `hexo.on('generateAfter' | 'ready' | ...)`.

## Gotchas

- A plugin not listed in `package.json` dependencies won't load.
- Scripts/plugins throwing at init can kill every command — `hexo --safe` isolates them.
- Renderable input is matched by file **extension**; a missing renderer for an extension means the file is copied raw (or errors).
- Warehouse Query objects aren't arrays — `.toArray()` before `forEach`/`map` in older idioms (`locals.posts` in generators supports `.map`).
