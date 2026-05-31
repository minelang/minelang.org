---
title: while
description: Condition-based loop.
icon: rotate_90_degrees_ccw
weight: 132
---

> Repeats a block as long as a boolean condition is true. Supports an optional continue expression that runs after each iteration or `continue` call.

---

- ### Syntax

    ```mine
    while cond :expr {
        // ...
    }
    ```

    > The condition (`cond`) is a boolean expression.
    >
    > The continue expression (`:expr`) is optional.
    >
    > `:expr` can be `:(expr)`.

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

    > Use [`break`](/docs/language/control_flow/break/) to exit the loop early.
    >
    > Use [`continue`](/docs/language/control_flow/continue/) to skip to the next iteration. the continue expression runs after each `continue`.