---
title: "let"
icon: lock
weight: 120
---

`let` creates an immutable binding. Type is inferred from the initializer. No shadowing, destructuring, and binding types as values.

---

- ## Basic syntax

    ```mine
    let x = 42
    let msg = "hello"
    ```

    Type is inferred from the initializer.

    ---

- ## Explicit type annotation

    ```mine
    let n: i64 = 0
    let val: f32 = 3.14
    ```

    ---

- ## Shadowing

    ```mine
    let x = 0;
    let x = 1; // error: Duplicate declaration 'x' in this scope
    ```

    ---

- ## Destructuring

    ```mine
    let pair = .{42, true}
    let a, b = pair

    let arr: [2]i32 = [100, 250]
    let x, y = arr
    ```

    Destructuring works on tuples, arrays, and any sequential type. The number of bindings must match the element count.

    ---

- ## Types are values

    ```mine
    let Point = struct { x: f32, y: f32 }
    let UserId = i32
    ```

    Any binding whose value has type `type` is automatically comptime (types don't exist at runtime).

    ---

