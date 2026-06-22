---
title: "Optionals"
icon: question_mark
weight: 131
---

`?T` represents a value that is either `null` or a value of type `T`. Supports orelse unwrapping, payload capture, chaining with `?.`, and exhaustive match.

---

- ## Syntax

    ```mine
    let maybe: ?i32 = null
    let value: ?i32 = 42
    ```

    `?T` means the value is either `null` or a value of type `T`. Nesting (`??T`) is valid but almost always unintentional (it produces `?(?T)`, an optional of an optional).

    ---

- ## Unwrapping

    ```mine
    let val = maybe orelse 0 // default if null
    let val = maybe.?        // panic if null
    ```

    ---

- ## Payload capture

    ```mine
    if maybe |val| {
        // val is i32 here
    }
    ```

    ---

- ## Chaining

    ```mine
    let result = obj?.field?.method() // short-circuits on null
    ```

    ---

- ## Match

    ```mine
    match x {
        |v| => v * 2,
        else => 0,
    }
    ```

    `|v|` and `else` together are exhaustive.

    ---