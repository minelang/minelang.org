---
title: "continue"
icon: "skip_next"
weight: 154
---

`continue` skips to the next iteration of a loop. Supports labels for targeting outer loops.

---

- ## Basic continue

    ```mine
    for v in items {
        if v < 0 { continue }
        process(v)
    }
    ```

    Skips to the next iteration of the innermost enclosing loop.

    ---

- ## Labels

    Use `continue :name` to continue an outer labeled loop from nested code:

    ```mine
    A: for item in outer {
        B: for inner in item {
            if skip { continue :A }  // continues outer loop A, not just B
        }
    }
    ```

    Without a label, `continue` only ever targets the innermost loop. See [`break`](./break) for using labels with `break`, including labels and break-with-value.

    ---