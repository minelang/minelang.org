---
title: for
description: Iterator-based loop.
icon: conversion_path
weight: 133
---

> Iterates over ranges, numbers, arrays, or custom iterators. Provides value and index bindings, with `_` to skip either.

---

- ### Syntax

    ```mine
    for binding in iterable {
        // ...
    }
    ```

    > `binding` can be a value and/or index. Use `_` to skip a binding: `for _, i in arr`.
    >
    > `iterable` can be a number, range, array, or custom iterator.
    >
    > Parentheses are optional: `for (v, i) in arr` or `for v, i in arr`.

    ---

- ### Examples

    ```mine
    // Iterate over a range
    for i in 0..10  { @printn(i) } // exclusive
    for i in 0..=10 { @printn(i) } // inclusive
    ```

    ```mine
    // Iterate over an array with value and index
    for v, i in arr { @printn("[{}] = {}", i, v) }
    for _, i in arr { @printn("index: {}", i ) } // skip value
    ```

    ```mine
    // Custom iterator
    for item in MyIterator(data) {
        @printn(item)
    }
    ```

    ---

- ### Notes

    > Use [`break`](/docs/language/control_flow/break/) to exit early. [`continue`](/docs/language/control_flow/continue/) to skip to the next iteration.
    >
    > Ranges work in both directions (forward and backward).
    >
    > Custom iterators must be structs with a public `next() ?T` method taking `self: *StructName`.
    >
    > See [Basic Iterator](/docs/examples/iterators/basic_iterator/) for practical examples.