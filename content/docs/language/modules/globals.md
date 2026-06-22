---
title: "Globals"
icon: public
weight: 113
---

Files ending in `.g.mine` (or `.g.m`) are global modules whose declarations are automatically injected into every module in the project without explicit import.

---

- ## Rules

    - All declarations in a `.g.mine` file are injected as `pub` (visibility modifiers are ignored)
    - `@import` of a `.g.mine` file is an error (they are already available everywhere)
    - Global files support the same declarations as ordinary `.mine` files

    ```mine
    // types.g.m
    def Point { 
        x: f32, 
        y: f32 
    }
    ```

    ```mine
    // x.m
    pub let p: Point = { x: 1.7, y: 2.1 }
    ```

    ---