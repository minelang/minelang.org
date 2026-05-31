---
title: fn
description: Function declaration.
icon: dynamic_form
weight: 123
---

> Declares a named function with optional parameters, return type, and error annotation. Supports `pub`, `inline`, and `comptime` modifiers.

---

- ### Syntax

    ```mine
    pub inline comptime fn ident(params) errset!type {
        // ...
    }
    ```

    > [`pub`](../keywords/pub), [`inline`](../keywords/inline), and [`comptime`](../keywords/comptime) are optional.
    >
    > Error annotation (`errset!`) is optional (if omitted but `!` is used, the [`errset`](../types/errset) is inferred).
    >
    > Return type (`type`) can be inferred from [`return`](../control_flow/return) statements if not specified (**required when `!` used**).
    >
    > Body must be a [block `{}`](../blocks/block).

    ---

- ### Examples

    ```mine
    // Explicit vs inferred return type
    fn add(a: i32, b: i32) i32 { return a + b }
    fn multiply(x: i32, y: i32) { return x * y }  // inferred as i32
    ```

    ```mine
    // No return value
    fn greet(name: []const u8) {
        @printn("Hello, {}", name)
    }
    ```

    ```mine
    // Default parameters
    fn configure(timeout: i32 = 30, retries: i32 = 3) {
        @printn("timeout: {}, retries: {}", timeout, retries)
    }
    ```

    ```mine
    // Error handling (inferred vs explicit error set)
    fn readFile(path: []const u8) ![]u8 {
        if (file_not_found) fail FileNotFound
        return contents
    }

    const ReadErrors = errset { FileNotFound, PermissionDenied }
    fn readFileExplicit(path: []const u8) ReadErrors![]u8 { ... }
    ```

    ```mine
    // pub / inline / comptime
    pub fn getValue() i32 { return 42 }
    inline fn max(a: i32, b: i32) i32 { if (a > b) return a else return b }
    comptime fn tableSize() usize { return 256 * 2 }
    ```

    ---

- ### Notes

    > [`inline`](../keywords/inline) hints inlining at call sites.
    >
    > [`comptime`](../keywords/comptime) forces compile-time evaluation.