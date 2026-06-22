---
title: "defer"
icon: undo
weight: 157
---

`defer` registers cleanup code that runs when the current scope exits, regardless of how it exits. For a variant that only runs on error paths, see [`errdefer`](./errdefer).

---

- ## Basic defer

    ```mine
    fn read_file(path: string) void {
        let f = open(path)
        defer close(f)
        // close(f) runs automatically when scope exits
    }
    ```

    ---

- ## Execution order

    Multiple `defer` blocks run in LIFO order (last registered runs first):

    ```mine
    fn example() void {
        defer @print("1")
        defer @print("2")
        defer @print("3")
        // prints: 3, 2, 1
    }
    ```

    `defer` runs on every scope exit (normal return, `fail`, or `break`/`continue` out of an enclosing loop within the same scope).

    ---