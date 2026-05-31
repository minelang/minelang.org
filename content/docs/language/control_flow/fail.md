---
title: fail
description: Return an error from a function.
icon: close
weight: 142
---

> `fail` exits the current function with an error value. The function's return type must include an error union (`!`).

---

- ### Syntax

    ```mine
    fail ErrorName
    ```

    > `ErrorName` must be a member of the function's error set (inferred or explicit).

    ---

- ### Examples

    ```mine
    // Inferred error set
    fn divide(a: i32, b: i32) !i32 {
        if (b == 0) fail DivisionByZero
        return a / b
    }
    ```

    ```mine
    // Explicit error set
    const MathErrors = errset { DivisionByZero, Overflow }

    fn divide(a: i32, b: i32) MathErrors!i32 {
        if (b == 0) fail DivisionByZero
        return a / b
    }
    ```

    ```mine
    // Multiple failure points
    fn parse(input: []const u8) !i32 {
        if (input.len == 0) fail EmptyInput
        if (!isNumeric(input)) fail InvalidFormat
        return toInt(input)
    }
    ```

    ---

- ### Notes

    > `fail` can only be used in functions with an error annotation (`!T` or `errset!T`).
    >
    > If no explicit [`errset`](../types/errset) is declared, Mine infers the error set from all `fail` sites in the function.
    >
    > Use [`try`](../expressions/try_catch) to propagate errors from called functions automatically instead of catching and re-failing.
    >
    > See [`return`](./return) for normal value returns and [`errdefer`](./errdefer) for error-path cleanup.