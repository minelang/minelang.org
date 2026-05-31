---
title: defer
description: Execute an expression when the current block exits.
icon: call_made
weight: 145
---

> Schedules an expression or block to run on scope exit, regardless of how the block exits. Multiple defers execute in reverse order (LIFO).

---

- ### Syntax

    ```mine
    defer expression
    defer { /* multiple statements */ }
    ```

    > Multiple `defer` statements execute in reverse order (LIFO).

    ---

- ### Examples

    ```mine
    // State restoration
    fn withState() void {
        var state = State()
        defer state.reset()
        // state.reset() runs on scope exit
    }
    ```

    ```mine
    // LIFO execution order
    fn multiDefer() void {
        defer @printn("first")
        defer @printn("second")
        defer @printn("third")
        // prints: third, second, first
    }
    ```

    ```mine
    // Scope-bound defer
    fn scopedDefer() void {
        @printn("start")
        {
            defer @printn("inner")
            @printn("middle")
        }
        // "inner" prints here, before "end"
        @printn("end")
    }
    ```

    ---

- ### Notes

    > `defer` runs on all exit paths (normal return and error return alike. use [`errdefer`](./errdefer) for error-only).
    >
    > Returning from within a `defer` block is a compile error.
    >
    > In Mine, struct `deinit()` is called automatically (manual `defer` for (e.g. **deallocation**) is not needed).