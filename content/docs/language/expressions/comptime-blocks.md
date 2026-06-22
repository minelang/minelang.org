---
title: "Comptime Blocks"
icon: timer
weight: 178
---

`comptime` blocks, `comptime` if/match, and `comptime` fn enable compile-time evaluation.

---

- ## Comptime block

    ```mine
    let x = comptime {
        let y = 40
        let z = 2
        y + z
    }
    // x == 42, computed at compile time
    ```

    ---

- ## Comptime if

    ```mine
    comptime if PLATFORM == .windows {
        // windows-specific
    } else {
        // other platform
    }
    ```

    ---

- ## Comptime match

    ```mine
    comptime match ARCH {
        .x86_64 => "amd64",
        .arm64  => "arm64",
        inline else => @compileError("unsupported arch"),
    }
    ```

    ---

- ## Comptime function

    ```mine
    comptime fn kilobytes(n: i32) i32 {
        n * 1024
    }
    comptime let BUFFER_SIZE = kilobytes(64)
    ```

    ---
