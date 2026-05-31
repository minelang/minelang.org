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

- ### Notes

    > Use control flow statements like [break](../control_flow/break/) or [return](../control_flow/return/) to exit an infinite loop.
    >
    > Use [continue](../control_flow/continue/) to skip to the next iteration.
    >
    > Continue expressions are useful for maintaining loop state like counters.
    >
    > For bounded loops with a condition, consider using `while` instead.
