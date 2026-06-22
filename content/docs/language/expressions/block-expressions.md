---
title: "Block Expressions"
icon: "data_array"
weight: 170
---

Mine does not have Zig's `blk:` labeled expression blocks. Instead bare `{ }` blocks already return their trailing expression as a value, and `if/else` handles conditional branching. Together these cover the same use cases without needing block labels.

- ## Block value

    ```mine
    let x = {
        42
    }
    // x == 42

    let y = {
        let tmp = 5
        tmp * 2
    }
    // y == 10
    ```

    The value of the last expression in a block is the block's value.

    ---

- ## Why no `blk:`

    Zig uses `blk: { ... break :blk value }` when you need a multi-statement block that produces a value. Mine solves this differently: bare `{ }` blocks already return their trailing expression, so no label or `break` is ever needed.

    | Zig                                        | Mine                     |
    | ------------------------------------------ | ------------------------ |
    | `blk: { break :blk 42 }`                   | `{ 42 }`                 |
    | `blk: { const x = f(); break :blk x * 2 }` | `{ let x = f(); x * 2 }` |

    ```zig
    // Zig: blk: required to get a value out of a multi-statement block
    const x = blk: {
        const tmp = expensive();
        break :blk tmp * 2;
    };
    ```

    ```mine
    // Mine: bare block already returns the trailing expression
    let x = {
        let tmp = expensive()
        tmp * 2
    }
    ```

    `if/else` is an expression in both Zig and Mine (no `blk:` needed for a simple conditional in either language). The gap `blk:` fills is specifically multi-statement blocks that compute a value, and Mine closes that gap with trailing-expression blocks.

    ---

- ## Block as expression vs statement

    A block used as a statement (its value is discarded) does not need a trailing expression:

    ```mine
    {
        compute()
        side_effect()
    }
    ```

    A block used as an expression (assigned, returned, or used inside another expression) must have a well-defined trailing value.

    ---
