---
title: "Error-Handling Expressions"
icon: shield
weight: 174
---

`try` unwraps and propagates errors, `catch` provides fallbacks, `orelse` handles null optionals, and payload capture unwraps values.

---

- ## try

    `try` unwraps an error union. On success it produces `T`. On error it propagates to the caller.

    ```mine
    fn process() MathErrors!void {
        try divide(a, b)
        let v = try divide(a, b) * 2
    }
    ```

    ---

- ## catch

    `catch` provides a fallback value on error.

    ```mine
    let v = divide(a, b) catch 0.0
    let v = divide(a, b) catch |e| {
        @print("err: ", e)
        0.0
    }
    ```

    `catch` consumes the error union entirely (the result is `T`, not `E!T`).

    ---

- ## orelse

    `orelse` unwraps an optional, providing a fallback for `null`. The symbolic form `??` is also accepted and behaves identically.

    ```mine
    let y = x orelse 0
    let z = x ?? 0 // same as `x orelse 0`
    ```

    The AST records which form was used via a `symbolic` flag on the `OrElseExprNode`.

    ---

- ## If capture

    ```mine
    if maybe |val| {
        // val is unwrapped T
    }

    if maybe |val| {
        // val is available
    } else {
        // handle null
    }
    ```

    ---

- ## Error match

    ```mine
    match divide(a, b) {
        |v|             => v,
        .DivisionByZero => 0.0,
        else |e|        => { @print(e); 0.0 },
    }
    ```

    ---
