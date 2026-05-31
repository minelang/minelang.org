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

- ### Examples

    ```mine
    // Basic while loop
    while (i < 10) {
        i += 1
    }
    ```

    ```mine
    // With continue expression
    while (i < 10) : (i += 1) {
        if (i == 5) continue
        @printn(i)
    }
    ```

    ---

- ### Notes

    > Use [break](/docs/language/control_flow/break/) to exit the loop early.
    >
    > Use [continue](/docs/language/control_flow/continue/) to skip to the next iteration; the continue expression runs after each `continue`.