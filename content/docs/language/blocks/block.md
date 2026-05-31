---
title: block
description: Scoped sequence of statements enclosed in braces.
icon: data_object
weight: 151
---

> Groups statements into a single unit with its own scope. Variables declared inside are not visible outside. Blocks are used in functions, loops, and anywhere a scoped unit is needed.

---

- ### Examples

    ```mine
    {
        var x = 10
        var y = 20

        @printn(x + y)
    }
    ```
    ---

- ### Scope

    > Variables declared inside a block are only visible within that block.

    ```mine
    {
        var value = 42
    }

    // error: value is not visible here
    @printn(value)
    ```