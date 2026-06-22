---
title: "Slices"
icon: view_stream
weight: 134
---

Slices are fat pointers (ptr + len) providing a dynamic-length view into a sequence. Support mutable slices, subslicing, and sentinel termination.

---

- ## Slice type

    ```mine
    let s   : []u8     = "hello"   // immutable slice
    mut arr : [3]u8    = [1, 2, 3]
    let s   : []mut u8 = arr[0..]  // mutable slice from a mutable array
    ```

    In Mine, `[]u8` is immutable by default (equivalent to Zig's `[]const u8`). Use `[]mut u8` for a mutable slice.

    ---

- ## Properties

    ```mine
    s.ptr   // *u8 for immutable, *mut u8 for mutable
    s.len   // length
    s[0]    // access
    s[1..3] // subslice, exclusive upper bound
    s[2..]  // open-ended subslice
    ```

    When both bounds of a subslice are comptime-known, the result type is `*[N]T` (a pointer to an array), which coerces to `[]T`.

    ---

- ## Sentinel-terminated slice

    ```mine
    let s: [:0]u8 = "hello" // zero-terminated, immutable
    ```

    ---