# Hexo Troubleshooting

Debugging generation issues. Source: https://hexo.io/docs/troubleshooting

## First-line tools

| Symptom | Try |
|---|---|
| Anything broken / weird output | `hexo --debug` — verbose log to terminal **and** `debug.log` (this repo: `npm run start:verbose`) |
| Broke after installing a plugin | `hexo --safe` — disables all plugins and `scripts/`; if it works, bisect plugins |
| Stale output, unchanged files, data not updating | `hexo clean` then regenerate (deletes `db.json` cache + `public/`); this repo: `npm run regen` |
| Hard crash during generate | `hexo generate --bail` — raises on first unhandled exception instead of continuing |
| Watch loop / port conflict | `hexo server -p <port>`; `-s`/`--static` to serve without watchers |

## Error catalogue

**YAML parsing errors** (`JS-YAML: ...`)
- `incomplete explicit mapping pair` — value contains colons → quote the string: `last_updated: "Last updated: %s"`.
- `bad indentation of a mapping entry` — use spaces (soft tabs) and a space after `:`.

**`Error: EMFILE, too many open files`** (large sites)
- `ulimit -n 10000`. If "cannot modify limit": add `* - nofile 10000` to `/etc/security/limits.conf`, ensure `session required pam_limits.so` in `/etc/pam.d/login`, and for systemd add `DefaultLimitNOFILE=10000` to `/etc/systemd/{system,user}.conf`; reboot.

**`FATAL ERROR: ... process out of memory`** during generate
- Raise Node heap: edit `hexo-cli` shebang to `#!/usr/bin/env node --max_old_space_size=8192`, or `NODE_OPTIONS=--max_old_space_size=8192 hexo generate`. Ref hexojs/hexo#1735.

**`Error: watch ENOSPC`** (Linux, `hexo server`/`--watch`)
- `npm dedupe`, else raise inotify watches: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

**`Error: listen EADDRINUSE`** — port taken (second server or another app): `hexo server -p 5000`.

**`Template render error: (unknown path)`**
- Invisible/zero-width chars in a file, or a block tag plugin missing `{% endplugin_name %}`. Narrow down by bisecting recent posts; `--debug` shows which file is rendering.

**Nunjucks escaping issues** — `{{ }}` / `{% %}` in post content gets parsed. Fix: wrap in `{% raw %}...{% endraw %}`, single-backtick or fenced code block; or set `disableNunjucks: true` in front-matter / renderer option.

**`hexo` only responds to `help`/`init`/`version`** — `package.json` missing the `"hexo": {"version": "..."}` marker; Hexo doesn't detect the directory as a site. Also check CWD vs `--cwd`.

**Git deploy failures** (hexo-deployer-git)
- `RPC failed; result=22, HTTP code = 403` → git not set up or use HTTPS remote.
- `ENOENT: no such file or directory` → usually case-mismatch in tag/category/filenames that git can't merge. Normalize casing, `hexo clean && hexo generate`, deploy manually once (copy `public/` to deployment branch), then resume `hexo deploy`.

**`npm ERR! node-waf configure build`** installing a plugin — native build missing compiler toolchain.

**Mac `DTraceProviderBindings MODULE_NOT_FOUND`** — `npm install hexo --no-optional`.

**WSL `Error: watch ... EMPERM`** — watchers unsupported on WSL; `hexo generate` then `hexo server -s`.

**Data model iteration** — `site.posts` etc. are Warehouse Query objects; `{% for post in site.posts.toArray() %}`.

## Debugging workflow for generation issues

1. `hexo clean` to eliminate stale `db.json`/`public/` state.
2. `hexo generate --debug --bail`; read `debug.log` — the log shows each processor/renderer/route.
3. If a plugin/script is suspected: `hexo --safe generate`. Then re-enable selectively (scripts are just files — move them out of `scripts/` to bisect).
4. Isolate content vs theme: `hexo render <file>` on a suspect post; check front-matter YAML parses (see YAML errors above).
5. Check `hexo list <type>` to verify the expected routes were generated.
6. Still stuck: search https://github.com/hexojs/hexo/issues or the Google Group; file an issue with `debug.log`.
