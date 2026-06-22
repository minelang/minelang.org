---
title: "Layout Modifiers"
icon: align_horizontal_left
weight: 192
---

`packed` eliminates struct padding, `extern` forces C ABI layout, `align(N)` overrides natural alignment of fields and types.

---

- ## packed struct

    ```mine
    let Flags = packed struct {
        read  : u1,
        write : u1,
        exec  : u1,
    }
    ```

    Pack eliminates padding between fields. All fields must be integers or packed structs.

    ---

- ## extern struct / union

    ```mine
    let CPoint = extern struct { x: f32, y: f32 }
    ```

    C ABI-compatible layout (field order preserved, target ABI alignment).

    ---

- ## align(N)

    ```mine
    let Aligned = struct {
        x: i32 align(16),
        y: i32,
    }
    ```

    Overrides the natural alignment of a field or type.

    ---

- ## packed union

    ```mine
    let PackedValue = packed union {
        int   : i32,
        bytes : [4]u8,
    }
    ```

    ---
