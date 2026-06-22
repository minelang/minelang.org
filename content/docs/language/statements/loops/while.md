---
title: "while"
icon: repeat_on
weight: 161
---

`while` loops run while a condition is true. Support optional continue-expression, `else` branch, and `inline` unrolling for comptime-known conditions.

---

- ## Basic

    ```mine
    mut i = 0 as i32
    while i < 10 {
        i += 1
    }
    ```

    ---

- ## With continue-expression

    ```mine
    while i < 10 : (i += 1) {
        if i == 5 { continue }
        process(i)
    }
    ```

    ---

- ## Loop else branch

    ```mine
    while condition {
        if done { break }
    } else {
        // runs if loop completes without break
    }
    ```

    ---

- ## Inline while

    ```mine
    inline while i < 3 : (i += 1) {
        process(i)
    }
    ```

    Forces compile-time unrolling. The condition must be comptime-known.

    ---
