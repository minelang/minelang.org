---
title: return
description: Exit a function with an optional value.
icon: check
weight: 141
---

> Transfers control back to the caller with an optional return value. All non-void code paths must explicitly return. Use `fail` to exit with an error instead.

---

- ### Syntax

    ```mine
    return
    return expr
    ```

    > Return value (`expr`) type must match the function's declared return type.

    ---

- ### Examples

    ```mine
    // Early return (guard clause pattern)
    fn validate(value: i32) bool {
        if (value < 0) return false
        if (value > 100) return false
        return true
    }
    ```

    ```mine
    // Conditional return
    fn getStatus(code: i32) []const u8 {
        return match(code) {
            200  => "OK",
            404  => "Not Found",
            else => "Unknown
        }
    }
    ```

    ---

- ### Notes

    > All code paths must return a value, falling off the end is a compile error unless the return type is void.
    >
    > [`defer`](./defer) statements execute before the return value is passed to the caller.
    >
    > Use [`fail`](./fail) to return an error. Use [`try`](../expressions/try_catch) to propagate errors automatically.