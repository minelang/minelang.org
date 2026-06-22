---
title: "Formatter"
icon: wand-sparkles
weight: 1002
---

> 🛠 _This part is still under design (I will update this document later)._

Mine ships with a built-in code formatter for `.mine` and `.m` source files.  By default it applies **MCS (Maysara Code Style)** a consistent opinionated style with box-drawing section headers, aligned declarations, and smart spacing.

---

- ## Usage

    - ### CLI

        ```bash
        mine fmt <file>                         # format a single file
        mine fmt --check <file>                 # check-only (exit 1 if not formatted)
        mine fmt --mcs-sections=false <file>    # disable MCS section headers
        ```

        Configuration via `.mine/config` (todo).

        ---

    - ### LSP

      - #### vscode

        Press `right-click` and choose one of the following options:
        - `format document`
        - `format project`

        ---

      - #### todo...

        > ...

        ---


- ## MCS Rules

    All rules are enabled by default.  Each can be disabled individually.

    | Rule                      | Description                                            |
    | ------------------------- | ------------------------------------------------------ |
    | `sections`                | Box-drawing section headers (`╔══╗`, ...)              |
    | `section-width`           | L1 section header width (default 100)                  |
    | `subsection-width`        | L2 subsection header width (default 85)                |
    | `sub3-width`              | L3 header width (default 72)                           |
    | `align-fields`            | Align `:` and `=` in struct/union fields               |
    | `align-match-arms`        | Align `=>` in match arms                               |
    | `align-trailing-comments` | Align trailing `//` comments to same column            |
    | `pack-section`            | Auto-group imports into a `PACK` section               |
    | `rest-section`            | Auto-group remaining code into `REST`                  |
    | `todo-section`            | Create empty `TODO` section for blank files            |
    | `metadata-line`           | Emit `# file : ...` header                             |
    | `prv-let-prefix`          | Add `prv let` prefix to struct fields                  |
    | `default-void-ret`        | Add `void` return type to functions missing it         |
    | `suppress-fn-blank-lines` | Remove blank lines between consecutive fn declarations |

    ---

- ## Flat Mode

    Disable `sections` for a **flat** output with no box-drawing, just indented code.  Useful for tools that don't understand box-drawing.

    ---

- ## Future

    - `mine fmt --check` (CI mode)
    - Config file support (`.mine/config`)

    ---
