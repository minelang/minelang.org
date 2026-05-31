---
title: var/const
description: Variables and Constants declarations.
icon: deployed_code
weight: 121
---

> `var` declares a mutable variable that can be reassigned after initialization.
>
> `const` declares an immutable binding that cannot be reassigned after initialization.

---

- ### Syntax

    ```mine
    pub comptime var ident : type = expr
    ```
    ```mine
    pub comptime const ident : type = expr
    ```

    > `pub` and `comptime` are optional.

    > Type annotation (`: type`) is optional if an initial value is provided.

    > Initial value (`= expr`) is optional if a type is provided.

    > Both type and value cannot be omitted (at least one must be specified).

    ---

- ### Examples

    ```mine
    // Explicit type and value
    var count: i32 = 0
    const MAX_SIZE: i32 = 100
    ```

    ```mine
    // Type inference
    var name = "Mine"
    const APP_NAME = "Mine"
    ```

    ```mine
    // Mutability
    var x = true
    x = false // allowed

    const y = true
    y = false // error: cannot assign to constant
    ```

    ---

- ### Notes

    > Compile-time variables/constants (`comptime var` / `comptime const`) are evaluated at compile time and must have compile-time computable values.
