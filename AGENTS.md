# Mine Docs — Development Guide

## What this repo is

Hugo static site for [minelang.org/docs](https://minelang.org/docs). Content lives in `content/docs/`. The theme is a git submodule at `themes/minedocs-theme`.

## Quick commands

| Command | What it does |
|---------|-------------|
| `mise exec -- hugo server` | Local preview |
| `hugo --minify` | Build for prod (output to `public/`) |
| `hugo mod get -u && hugo mod tidy` | Update Hugo modules |

## Setup

```bash
mise install                    # Install Hugo Extended
git submodule update --init --recursive
```

## Content structure

```
content/docs/
├── _index.md              # Docs section landing
├── section_0/             # Overview Phase (weight: 1)
│   ├── _index.md
│   ├── hello-world.md
│   ├── syntax.md
│   ├── variables.md
│   ├── functions.md
│   ├── keywords.md
│   ├── types.md
│   └── loops.md
├── section_1/             # Imagination Phase (weight: 2)
└── section_2/             # Implementation Phase (weight: 3)
```

Add new docs: drop `.md` files in `content/docs/section_N/`. Use front matter:

```yaml
---
title: "Page Title"
description: "Brief description"
icon: "code"         # Material Icons name
weight: 1            # Order (lower first)
draft: false
toc: true
---
```

## Syntax highlighting

The theme uses Prism.js. Custom Mine grammar at:
- `themes/minedocs-theme/static/docs/js/components/prism-mine.min.js`

Use in markdown:
<pre>
```mine
fn main() { var x = 1; }
```
</pre>

## Front matter fields

| Field | Required? | Description |
|-------|-----------|-------------|
| `title` | Yes | Page title |
| `description` | No | Shown in cards |
| `icon` | No | Material Icons name |
| `weight` | No | Order (default: 999) |
| `toc` | No | Show table of contents |

## Section ordering

Hugo orders by `weight` in `_index.md`. Current weights:
- section_0: 1, section_1: 2, section_2: 3

## Important quirks

- `go.mod` replaces remote theme with local `./themes/minedocs-theme`
- `markup.goldmark.renderer.unsafe = true` — raw HTML allowed in Markdown
- `.vscode/settings.json` hides non-content files

## CI / deploy

- CI builds with Hugo 0.128.0
- `public/` is gitignored — don't commit it