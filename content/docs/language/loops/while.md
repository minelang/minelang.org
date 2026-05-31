---
title: while
description: Condition-based loop construct.
icon: all_inclusive
weight: 132
---

> `while` repeats a statement or block as long as a condition remains true.

---

- ### Syntax

    ```mine
    while cond : expr {
        // ...
    }
    ```

    > `cond` is a boolean expression.

    > `: expr` is optional.

    > `expr` can be `(expr)`.


---

- ### Notes

    > Use [break](/docs/language/control_flow/break/) to exit the loop early.
    >
    > Use [continue](/docs/language/control_flow/continue/) to skip to the next iteration.
    >
    > Continue expressions are useful for updating loop variables, similar to increment expressions in other languages.