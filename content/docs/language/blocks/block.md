---
title: Blocks
description: Scoped groups of statements enclosed in braces.
icon: data_object
weight: 151
---

> A block is a scoped sequence of statements enclosed in braces.
>
> Blocks are used whenever multiple statements must be grouped together as a single unit.

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