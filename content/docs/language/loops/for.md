---
title: for
description: Iterator-based loop construct.
icon: all_inclusive
weight: 133
---

> `for` iterates over numbers, ranges, or arrays, providing values and indices to the loop body.

---

- ### Syntax

    ```mine
    for binding in iterable {
        // ...
    }
    ```

    > `binding` can be a value and/or index. Use `_` to skip a binding: `for _, i in arr`.

    > `iterable` can be a number, range, array, or custom iterator.

    > Parentheses are optional: `for (v, i) in arr` or `for v, i in arr`.

---

- ### Notes

    > Use [break](/docs/language/control_flow/break/) to exit the loop early.
    >
    > Use [continue](/docs/language/control_flow/continue/) to skip to the next iteration.

    > Ranges: `start..end` (exclusive) and `start..=end` (inclusive).
    >
    > Ranges work in both directions (forward and backward).

    > Custom iterators must be structs with a public `next()` method.
    >
    > Iterator `next()` method must return an optional type (e.g., `?T`).
    >
    > Iterator `next()` method must take `self: *StructName` as the first parameter.
    >
    > See [Basic Iterator](/docs/examples/iterators/basic_iterator/) for practical examples of creating custom iterators.
