---
title: "mut"
icon: lock_open
weight: 121
---

`mut` creates a mutable binding that can be reassigned. Can be combined with `comptime` for values that are mutable during compilation but don't exist at runtime.

---

- ## Basic syntax

    ```mine
    mut y = 10
    y += 1
    ```

    ---

- ## With type annotation

    ```mine
    mut counter: i32 = 0
    ```

    ---

- ## `comptime mut`

    `comptime mut` is a valid but rare combination. The binding is mutable during compilation. useful for building up comptime state across declarations (but has no runtime existence). At runtime it is just a baked-in value, not a variable.

    ```mine
    comptime mut count = 0
    count += 1  // fine: mutation happens at compile time
    ```

    Use this only when you genuinely need mutable state during a compile-time computation. In most cases a regular `comptime` binding is sufficient.

    ---