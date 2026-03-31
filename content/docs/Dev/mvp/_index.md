---
title: MVP
description: Mine (Minimum Viable Product)
icon: sports_score
weight: 2
---
<br>


> I will divide the MVP into smaller stages, which can be imagined as puzzle pieces. When the work is finished and all the pieces are assembled, the picture will look clear.

1. ###### [tscore/syntax](./syntax)

    >  `current-stage`
    >
    > _from **31/3/2026** to **now**._

---

<br>

- ## Stack

    > Everything is TypeScript for the MVP. The goal is to ship something that works - not something that's fast. Speed comes later with the real compiler.

    ```bash
    # Help
    @langpkg/lexer        # Source → Tokens
    @langpkg/parser       # Tokens → AST

    # main
    @minelang/tscore      # CORE   → everything..

    # Tools
    @minelang/tscli       # CLI    → run / build / test / check
    @minelang/vscode-mine # VSCode → syntax highlight + basic LSP
    ```

---

<br>

- ## Repos

    |                                                                  |
    | ---------------------------------------------------------------- |
    | [@minelang/tscore](https://github.com/minelang/tscore)           |
    | [@minelang/tscli](https://github.com/minelang/tscli)             |
    | [@minelang/vscode-mine](https://github.com/minelang/vscode-mine) |
    |                                                                  |
