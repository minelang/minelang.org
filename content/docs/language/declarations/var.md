---
title: var
description: Mutable variable declaration.
icon: variable_add
weight: 121
---

> Declares a named binding that can be reassigned after initialization. Supports type inference, optional initial values, and `pub`/`comptime` modifiers.

---

- ### Syntax

    ```mine
    pub comptime var ident : type = expr
    ```

    > [`pub`](../keywords/pub) and [`comptime`](../keywords/comptime) are optional.
    >
    > Type annotation (`: type`) is optional if an initial value is provided.
    >
    > Initial value (`= expr`) is optional if a type is provided.
    >
    > Both type and value cannot be omitted (at least one must be specified).

    ---

- ### Examples

    ```mine
    var count: i32 = 0          // explicit type and value
    var name = "Mine"           // type inferred as []const u8
    var buffer: [256]u8         // explicit type, no initial value
    ```

    ```mine
    pub comptime var DEBUG = true
    ```

    ```mine
    var x = 10 as i32
    x = 20 // allowed
    x = x + 5
    ```

    ---

- ### Notes

    > Variables are mutable by default (use [`const`](./const) for immutable bindings).
    >
    > `comptime var` is evaluated at compile time and must have a compile-time computable value.