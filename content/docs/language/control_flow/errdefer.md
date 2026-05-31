---
title: errdefer
description: Execute an expression only when the function exits with an error.
icon: call_missed_outgoing
weight: 146
---

> Like `defer`, but only triggers on error exits via `fail` or propagated errors. Skipped on successful returns. Multiple `errdefer` statements execute in reverse order (LIFO).

---

- ### Syntax

    ```mine
    errdefer expression
    errdefer { /* multiple statements */ }
    ```

    > Like [`defer`](./defer), multiple `errdefer` statements execute in reverse order (LIFO).

    ---

- ### Examples

    ```mine
    // Cleanup only on failure
    fn processFile(path: []const u8) !void {
        var file = try openFile(path)
        errdefer closeFile(file)  // skipped on success

        try process(file)
    }
    ```

    ```mine
    // Multiple errdefers (LIFO on error)
    fn setup() !void {
        var file = try openFile("data.txt")
        errdefer closeFile(file)

        var buf = try allocate(1024)
        errdefer deallocate(buf)

        try validate(buf)
        // on error: deallocate → closeFile
    }
    ```

    ```mine
    // Combining defer and errdefer
    fn operation() !void {
        defer @printn("always runs")
        errdefer @printn("only on error")
        try perform()
    }
    ```

    ---

- ### Notes

    > `errdefer` triggers on any error exit (via [`fail`](./fail) or propagated errors from [`try`](../expressions/try_catch)).
    >
    > Scope-aware: only applies from its declaration to the end of the block.
    >
    > In Mine, struct `deinit()` is automatic (`errdefer` is for non-struct resources or state rollback).
    >
    > See [`defer`](./defer) for cleanup on all paths and [`fail`](./fail) for returning errors.