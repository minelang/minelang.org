---
title: "Optimization Modifiers"
icon: speed
weight: 193
---

`inline` and `noinline` control function inlining, `volatile` marks memory accesses with side effects for MMIO and hardware registers.

---

- ## inline

    Suggests inlining at the call site.

    ```mine
    inline fn fast_path() void { ... }
    ```

    Can also appear on loop forms:

    ```mine
    inline while cond { ... }
    inline for v in arr { ... }
    ```

    ---


- ## noinline

    Prevents inlining at the call site.

    ```mine
    noinline fn debug_trace() void { ... }
    ```

    ---


- ## volatile

    Mark loads/stores as having side effects. Prevents the compiler from optimizing away repeated accesses.

    ```mine
    let p: *volatile u8 = @ptrFromInt(0x1234)
    let val = p.*    // always reads from the address
    ```

    Typically used for memory-mapped I/O and hardware registers.

    ---

