---
title: loop
description: Infinite loop construct.
icon: all_inclusive
weight: 131
---

> `loop` creates an infinite loop that repeats a statement or block until explicitly exited.

---

- ### Syntax

    ```mine
    loop : expr {
        // ...
    }
    ```

    > `: expr` is optional.

    > `expr` can be `(expr)`.

    ---

- ### Examples

    ```mine
    // Basic infinite loop
    loop {
        if (done) break
    }
    ```

    ```mine
    // With continue expression (acts as increment)
    loop : (i += 1) {
        if (i >= 10) break
    }
    ```

    ---

- ### Notes

    > Use [break](../control_flow/break/) or [return](../control_flow/return/) to exit an infinite loop.
    >
    > Use [continue](../control_flow/continue/) to skip to the next iteration. the continue expression runs after each `continue`.
    >
    > For bounded loops with a condition, consider using `while` instead.