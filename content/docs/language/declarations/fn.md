---
title: fn
description: Function declarations with optional error handling.
icon: resume
weight: 122
---

> `fn` declares a function that executes a block of statements and optionally returns a value.

---

- ### Syntax

    ```mine
    pub inline comptime fn ident(params) errset!return_type {
        // ...
    }
    ```

    > `pub`, `inline`, and `comptime` are optional.

    > Return type can be inferred from `return` statements if not specified.

    > `errset!` is optional (if omitted but `!` is used, the error set is inferred).

    > Body must be a block `{}`.

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

    > `inline` hints inlining at call sites.
    >
    > `comptime` forces compile-time evaluation.