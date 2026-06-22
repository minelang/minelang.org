---
title: "for"
icon: repeat_one
weight: 162
---

`for` iterates over arrays, slices, ranges, and custom iterators. Support index capture, value discard, range syntax with `by` step, and `else` branch.

---

- ## Basic for

    ```mine
    for v in arr {
        process(v)
    }
    ```

    ---

- ## With index

    ```mine
    for v, i in arr {
        @print(i, v)
    }
    ```

    ---

- ## Discard value

    ```mine
    for _, i in arr {
        @print(i)
    }
    ```

    ---

- ## Ranges

    ```mine
    for i in 0..10  { }  // 0, 1, ..., 9 (half-open, ascending)
    for i in 0..=10 { }  // 0, 1, ..., 10 (inclusive, ascending)
    for i in 10..0  { }  // 10, 9, ..., 1 (half-open, descending)
    for i in 10..=0 { }  // 10, 9, ..., 0 (inclusive, descending)
    ```

    Direction is determined by comparing start and end. `a..b` with `a < b` ascends, `a..b` with `a > b` descends.

    ---

- ## Step

    ```mine
    for i in 0..10 by  2 { }  // 0, 2, 4, 6, 8 (ascending, step 2)
    for i in 10..0 by  2 { }  // 10, 8, 6, 4, 2 (descending, step 2)
    for i in 0..10 by -2 { }  // 0, -2, -4, -6, -8 (explicit negative step)
    ```

    ---

- ## Loop else branch

    ```mine
    for v in items {
        if isTarget(v) { break found }
    } else {
        // no break occurred (not found)
    }
    ```

    ---

- ## Custom iterators

    Any class/struct with `fn next() ?T` satisfies the iterator protocol:

    ```mine
    // via struct
    pub let MyIterator = struct {
        ...
        pub fn next(self: *Self) ?T {
            ...
        }
    }

    let iter = MyIterator {..}
    for item in iter { }
    ```

    ```mine
    // via class
    pub let MyIterator = class {
        ...
        pub mut fn next() ?T {
            ...
        }
    }

    let iter = MyIterator(..)
    for item in iter { }
    ```

    For compile-time unrolling, see [Inline Loops](./inline-loops.md).

    ---
