---
title: "errdefer"
icon: undo
weight: 158
---

`errdefer` registers cleanup code that runs only when the current scope exits via an error path. It's strictly a subset of [`defer`](./defer)'s behavior (same LIFO ordering, but skipped entirely on a normal exit).

---

- ## Basic errdefer

    ```mine
    fn process() FileErrors!void {
        let file = try open(path)
        defer file.close()      // always runs
        errdefer log("failed")  // only on error
        try write(file, data)
    }
    ```

    ---

- ## Execution order on error

    1. `try`/`fail` detects an error
    2. `errdefer` blocks run (LIFO)
    3. `defer` blocks run (LIFO)
    4. The error propagates to the caller

    On normal exit, only `defer` blocks run (LIFO) (`errdefer` blocks are skipped entirely).

    ---