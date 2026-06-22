---
title: "use"
icon: link
weight: 112
---

The `use` statement is syntactic sugar for [`@import`](./import). It supports wildcard, namespaced, selective, and public re-export forms.

---

- ## Wildcard import

    ```mine
    use * from "math.m"
    ```

    All public symbols from `math.m` are pulled into the current scope (including any `pub impl` blocks).

    ---

- ## Namespaced import

    ```mine
    use * as Math from "math.m"
    Math.sqrt(16.0)
    ```

    All symbols (including `pub impl` blocks) are available under the `Math` namespace.

    ---

- ## Selective import

    ```mine
    use { sqrt, PI } from "math.m"
    use { sqrt as squareRoot } from "math.m"
    ```

    Import specific symbols, optionally with aliases.

    ---

- ## impl import

    ```mine
    use impl from "extensions.m"                // all pub impl blocks
    use impl { i32, bool } from "extensions.m"  // only pub impl for i32 and bool
    ```

    `use impl` imports impl blocks only (no types, functions, or other symbols). Without `{}`, all `pub impl` blocks in the file are imported. Only blocks marked `pub impl` are eligible. private impl blocks are invisible to importers.

    If two imported files define a `pub impl` for the same type and method, the last import wins.

    ---

- ## Public re-export

    ```mine
    pub use * from "internal.mine"
    pub use impl from "extensions.m"
    ```

    With `pub`, the imported symbols (or impl blocks) are re-exported from this module.

    ---

- ## Bad Practices

    ```mine
    use("math.m") // error: should be `use * from ".."`
    ```

    ---