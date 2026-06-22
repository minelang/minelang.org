---
title: "Pointers"
icon: near_me
weight: 132
---

Pointers include single-item `*T`, many-item `[*]T`, sentinel-terminated `[*:0]T`, slices `[]T`, and C pointers `[*c]T`. Qualifiers control mutability, volatility, alignment, and nullability.

---

- ## Single-item pointer

    ```mine
    let p: *i32 = &val
    let p: *mut i32 = &mut_val
    ```

    `*T` points to one value. `*mut T` allows mutation.

    ---

- ## Many-item pointer

    ```mine
    let p: [*]i32 = &arr
    let p: [*]mut u8 = &buf
    ```

    `[*]T` points to an unknown number of elements. No length carried.

    ---

- ## Nullable pointer

    ```mine
    let p: ?*i32 = null
    ```

    ---

- ## Dereference

    ```mine
    let val = p.*
    ```

---

- ## Pointer qualifiers

    Order: `volatile` `allowzero` `align(N)` `mut`

    - ### `volatile`

        Marks a pointer as accessing hardware or memory-mapped I/O. Every read and write through a `volatile` pointer is guaranteed to happen exactly as written (the compiler will not reorder, merge, or eliminate them).

        ```mine
        let reg: *volatile u32 = @ptrFromInt(0x4000_0000)
        reg.* = 1     // write is never optimized away
        let v = reg.* // read always hits the actual address
        ```

        `volatile` is strictly for memory-mapped registers and similar hardware interfaces. It has nothing to do with thread safety or concurrency (use atomics for that).

        ---

    - ### `allowzero`

        By default, the compiler assumes pointers are never null (address zero). `allowzero` lifts that assumption, allowing the pointer to legally hold address `0x0`. This is needed on targets where address zero is valid memory (some embedded and freestanding environments).

        ```mine
        let p: *allowzero i32 = @ptrFromInt(0)
        ```

        On most targets you will never need this. Without it, dereferencing a null pointer is illegal behavior.

        ---

    - ### `align(N)`

        Asserts that the pointed-to address is aligned to `N` bytes. The compiler uses this to emit more efficient load/store instructions and to enable SIMD operations that require specific alignment.

        ```mine
        let p: *align(16) f32 = &val   // val is 16-byte aligned
        ```

        If the alignment assertion is wrong at runtime, behavior is undefined. Use `@alignCast` when you need to narrow alignment from a wider-aligned pointer.

        ---

    ```mine
    let p: *volatile u8 = @ptrFromInt(0x1234)
    let p: *allowzero i32 = undefined
    let p: *align(16) f32 = &val
    ```

    _📢 The exact API for `@ptrFromInt` may be redesigned later._

    ---

- ## Sentinel-terminated many-item pointer

    ```mine
    let p: [*:0]u8 = cString // null-terminated C string
    ```

    `[*:0]T` is a many-item pointer with a sentinel value at the end. The most common use is C strings (`[*:0]u8`), where the sentinel `0` marks the end of the sequence. Like `[*]T`, it carries no length (the sentinel is the terminator).

    ---

- ## C pointer

    ```mine
    let p: [*c]u8 = @ptrFromInt(addr)
    ```

    `[*c]T` is a nullable many-item pointer for C ABI compatibility.

    ---