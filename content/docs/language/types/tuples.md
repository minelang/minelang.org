---
title: "Tuples"
icon: playlist_remove
weight: 135
---

Tuples are anonymous heterogeneous value groups `.{ T1, T2, ... }` useful for returning multiple values from functions.

---

- ## Tuple type

    ```mine
    let pair: .{ i32, bool } = .{ 42, true }
    ```

    ---

- ## Tuple value

    ```mine
    let result = .{ min, max }
    result[0]   // min, comptime-known index only
    result.len  // number of fields, comptime constant
    ```

    Tuples support `[]` indexing and `.len` like arrays. The index must be comptime-known.

    ---

- ## Destructuring

    ```mine
    let x, y = .{55, true}
    ```

    Binds each field to a name in order. The number of bindings must match the tuple length.

    ---

- ## Single-element tuple

    ```mine
    let single: .{ f32, } = .{ 3.14, } // ok
    let single: .{ f32  } = .{ 3.14  } // ok
    ```

    In Mine, we only use `.{}` for tuples, so the comma rule is unnecessary.

    ---

- ## Return multiple values

    ```mine
    fn minMax(arr: []i32) .{ i32, i32 } {
        mut min = arr[0]
        mut max = arr[0]
        for v in arr {
            if v < min { min = v }
            if v > max { max = v }
        }
        .{ min, max }
    }
    ```

    ---