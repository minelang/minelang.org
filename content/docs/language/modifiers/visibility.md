---
title: "Visibility"
icon: visibility
weight: 190
---

`pub` makes symbols visible outside the declaring module. Default is private. Can also re-export imported symbols on `use` statements.

---

- ## pub

    Makes a symbol visible outside the declaring module.

    ```mine
    pub fn visible() void { }
    pub let ExportedType = struct { ... }
    pub comptime let VALUE = 42
    ```

    ---


- ## Default: private

    All declarations are private by default (visible only within the same file).

    ---


- ## On use statements

    ```mine
    pub use * from "internal.mine"
    ```

    Re-exports imported symbols from the current module.

    For `prv`, see its dedicated role in [class constructor field promotion](../types/classes#constructor-field-promotion).

    ---

