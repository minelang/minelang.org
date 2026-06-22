---
title: "fail"
icon: logout
weight: 152
---

`fail` exits a function with an error. It's strictly separated from [`return`](./return) by the type system (`return` for value paths, `fail` for error paths).

---

- ## Basic fail

    Only valid in functions returning `E!T`:

    ```mine
    fn divide(a: f32, b: f32) MathErrors!f32 {
        if b == 0.0 { fail DivisionByZero }
        a / b
    }
    ```

    ---

- ## Strict separation

    `return` and `fail` are enforced by the type system:

    | Returns | Value path         | Error path     |
    | ------- | ------------------ | -------------- |
    | `T`     | `return x` or expr | error          |
    | `E!T`   | `return x` or expr | `fail Variant` |
    | `void`  | `return` or bare   | error          |
    | `never` | error              | error          |

    ---