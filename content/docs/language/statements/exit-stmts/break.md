---
title: "break"
icon: "skip_next"
weight: 153
---

`break` exits a loop. Supports labels for targeting outer loops, and can carry a value out of a labeled or unlabeled loop expression.

---

- ## Basic break

    ```mine
    for v in items {
        if v == target { break }
    }
    ```

    `break` exits the innermost enclosing loop.

    ---

- ## Labels

    Labels let you name a loop with `name:` syntax. Use `break :name` to exit that specific loop from nested code, even from inside an inner loop:

    ```mine
    A: for item in outer {
        B: for inner in item {
            if done { break :A }  // breaks outer loop A, not just B
        }
    }
    ```

    Without a label, `break` only ever targets the innermost loop. See [`continue`](./continue) for using labels with `continue`.

    ---

- ## break with value from labeled loop

    A labeled loop can produce a value via `break :label value`:

    ```mine
    let found = search: for item in collection {
        if matches(item, target) {
            break :search item
        }
    }
    // found == item if found, or null if loop completes normally
    ```

    The loop expression evaluates to the `break` value.

    ---

- ## break with value from loop (unlabeled)

    An unlabeled `loop` can also produce a value:

    ```mine
    let result = loop {
        if done {
            break found_value
        }
    }
    // result == found_value
    ```

    ---