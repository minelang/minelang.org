---
title: "Visibility"
icon: visibility
weight: 110
---

Declarations are private by default. Use `pub` to make them visible to importing modules. The `prv` keyword is used only in class constructor parameters for private field promotion.

---

- ## `pub`

    Marks a symbol as visible to modules that import this file.

    ```mine
    pub let Exported = 42
    pub fn visible() void { }
    ```

    ---

- ## `prv`

    `prv` is only meaningful in class constructor parameters, where it promotes a parameter to a private field. Outside of that context it is redundant (the default is already private) but may be written for clarity.

    ```mine
    let Point = class {
        Self(pub x: f32, prv y: f32) {} // x is public field, y is private field
    }
    ```

    Parameters without `pub` or `prv` are local-only - used in the constructor body but not stored as fields.

    ---