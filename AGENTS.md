# Mine Docs — Development Guide

## What this repo is

Hugo static site for [minelang.org/docs](https://minelang.org/docs). Content lives in `content/docs/`. The theme is a git submodule at `themes/minedocs-theme`.

## Setup & local preview

- **Install Hugo Extended** via `mise.toml`: the repo pins `hugo-extended = "latest"` — run `mise install` to get it.
- **Fetch submodule**: `git submodule update --init --recursive`
- **Update Hugo modules**: `hugo mod get -u && hugo mod tidy`
- **Preview locally**: `mise exec -- hugo server` (or `hugo server` when in a mise-aware shell)
- **Build for prod**: `hugo --minify` (output goes to `public/`)

## CI / deploy

- `.github/workflows/deploy.yml` builds with Hugo 0.128.0 and Dart Sass.
- CI always does a full recursive checkout (`submodules: recursive`) and runs `hugo --minify --baseURL`.
- `public/` and `resources/` are gitignored; CI uploads `public/` as a Pages artifact.
- Do not commit `public/` or `resources/`.

## Important quirks

- `go.mod` replaces `github.com/maysara-elshewehy/minedocs-theme` with a local path `./themes/minedocs-theme`. Always use the replace directive, not the remote.
- `markup.goldmark.renderer.unsafe = true` in `hugo.toml` — raw HTML is allowed inside Markdown content.
- The theme SCSS build depends on `hugo-mod-bootstrap-scss/v5` and Dart Sass. If styling breaks, ensure the extended Hugo binary and Dart Sass are both installed.
- `.vscode/settings.json` hides all non-content files from the explorer — most repo config is invisible in VS Code unless toggled.

## Content structure

```
content/docs/
  _index.md        # docs section landing page
  section_1/       # first doc section (add .md files here)
  section_2/       # second doc section
```

New docs are just Markdown files in `content/docs/`. No codegen or migrations.