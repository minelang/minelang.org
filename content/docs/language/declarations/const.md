---
title: const
description: Immutable constant declaration.
icon: variable_remove
weight: 122
---

> Declares a named binding that cannot be reassigned after initialization. Supports type inference, optional initial values, and `pub`/`comptime` modifiers.

---

- ### Syntax

    ```mine
    pub comptime const ident : type = expr
    ```

    > [`pub`](../keywords/comptime) and [`comptime`](../keywords/comptime) are optional.
    >
    > Type annotation (`: type`) is optional if an initial value is provided.
    >
    > Initial value (`= expr`) is optional if a type is provided.
    >
    > Both type and value cannot be omitted (at least one must be specified).

    ---

- ### Examples

    ```mine
    const MAX_SIZE: i32 = 100   // explicit type and value
    const APP_NAME = "Mine"     // type inferred as []const u8
    const header: Header        // explicit type, no initial value
    ```

    ```mine
    pub comptime const ARCH = "x86_64"
    ```

    ```mine
    const y = 10 as i32
    y = 20 // error: cannot assign to constant
    ```

    ---

- ### Notes

    > Constants are immutable (once set, the binding cannot be reassigned. use [`var`](./var) for mutable bindings).
    >
    > `comptime const` is evaluated at compile time and must have a compile-time computable value.