---
title: "Control-Flow Expressions"
icon: alt_route
weight: 177
---

`if/else`, `match`, and ternary `?:` are all expressions that produce values. `match` supports exhaustive checking, range patterns, and destructuring. For bare block expressions (no `if`/`match`) see [Block Expressions](./block-expressions.md).

---

- ## if / else

    ```mine
    let label = if score > 100 { "high" } else { "low" }
    ```

    `if` as a statement may omit `else`:

    ```mine
    if x > 0 { @print("positive") }
    ```

    `if` as an expression requires `else`:

    ```mine
    let x = if cond { 1 } else { 0 }
    ```

    ---

- ## Ternary

    ```mine
    let x = cond ? 1 : 2
    ```

    ---

- ## Match

    ```mine
    match direction {
        .North => "up",
        .South => "down",
        else   => "other",
    }
    ```

    ---

    - ### Exhaustiveness

        | Type              | `else` needed?               |
        | ----------------- | ---------------------------- |
        | `enum { }`        | No (warning if redundant)    |
        | `union(enum) { }` | No (warning if redundant)    |
        | `?T`              | No (capture/else exhaustive) |
        | `E!T`             | Yes                          |
        | Primitives        | Yes                          |

        ---

    - ### Range patterns

        ```mine
        match score {
            0..50    => "fail",
            50..90   => "pass",
            90..=100 => "excellent",
            else     => "invalid",
        }
        ```

        ---

    - ### Destructuring

        ```mine
        match v {
            |val| => val,
            else |e| => { @print(e); 0 },
        }
        ```

        ---
