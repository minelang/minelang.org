---
title: "LSP"
icon: code
weight: 1001
---

> 🛠 _This part is still under design (I will update this document later)._

The Mine Language Server provides IDE features for Mine source files.

---

- ## Features

    | Feature             | Description                                                               |
    | ------------------- | ------------------------------------------------------------------------- |
    | Completions         | Keywords, identifiers, member access, `@import` and `use` paths, snippets |
    | Hover               | Type information, documentation, size/alignment                           |
    | Go to Definition    | Navigate to symbol declarations                                           |
    | Find References     | Locate all usages of a symbol                                             |
    | Diagnostics         | Real-time errors and warnings                                             |
    | Code Actions        | Quick fixes for common issues                                             |
    | Signature Help      | Parameter hints on function calls                                         |
    | Document Symbols    | Outline view of the current file                                          |
    | Folding Ranges      | Collapse sections, blocks, and comment groups                             |
    | Document Highlights | Highlight all occurrences of a symbol                                     |
    | Inlay Hints         | Type annotations, parameter names                                         |
    | Code Lens           | Test/bench run buttons                                                    |

    ---

- ## Triggers

    Completions are triggered automatically on:

    - `.` - member access
    - `@` - builtins and imports
    - Regular typing for keyword and identifier completions

    ---

- ## Configuration

    The LSP reads `.mine` and `.m` files and the project's `.mine/config` for package resolution. It does not require compilation to provide diagnostics (it works on the raw source AST).

    ---

- ## Supported editors

    | Editor                                       | Progress |
    | -------------------------------------------- | -------- |
    | `vscode`, `cursor`, `kiro`, `trea`, `neovim` | ~90%     |
    | `zed`, `...`                                 | not yet  |

    ---
