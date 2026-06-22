---
title: "Type Conversions"
icon: swap_horiz
weight: 176
---
`as` performs bitcasts between same-sized types, `into` performs value-preserving numeric conversions, `@ptrCast` reinterprets pointer types. `++` concatenates arrays and slices at compile time.

---

- ## `as` - bitcast

    `as` reinterprets the bit pattern. Source and target must have the same size.

    ```mine
    let x: i32 = 42
    let y: u32 = x as u32    // OK: same size
    let z: f32 = x as f32    // bitcast, NOT numeric: 42 -> bit pattern of 42, not 42.0
    let bad: i64 = x as i64  // error: different sizes
    ```

    ---

- ## `into` - numeric conversion

    `into` performs value-preserving numeric conversions.

    ```mine
    let w: i64 = (42 as i32) into i64   // widening, lossless
    let f: f32 = (42 as i32) into f32   // int -> float
    let b: i32 = (42.9 as f32) into i32 // float -> int, truncates toward zero
    let s: i8  = (1000 as i64) into i8  // narrowing, checked
    ```

    - Widening `into` never fails
    
    - Narrowing `into` is checked (panics in debug if value doesn't fit)
    
    - For user types, `into` calls `op into(self) T`

---

- ## `@ptrCast` - pointer casting

    Reinterprets a pointer as a different pointer type. Unlike `as`, the source and target may have different sizes (different pointer types):

    ```mine
    let ptr: *i32 = @ptrCast(&byte)
    ```

    ---

- ## Qualifier casts

    ```mine
    let mutable: *mut T   = @constCast(const_ptr)       // remove const
    let unvolatile: *T    = @volatileCast(volatile_ptr) // remove volatile
    let generic: *T       = @addrSpaceCast(gpu_ptr)     // change address space
    ```

    These remove qualifiers from pointers: `@constCast` removes `const`, `@volatileCast` removes `volatile`, `@addrSpaceCast` changes address space (GPU targets). Use sparingly (only when you know the qualifier is unnecessary).

    ---
