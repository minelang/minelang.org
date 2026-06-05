---
title: Philosophy
description: The ideas behind Mine (how it thinks, and why).
icon: neurology
weight: 12
---

Mine is built around three simple defaults. Everything else follows from them.

---

- ### Immutable by default

    Bindings, fields, and parameters cannot be reassigned unless explicitly marked `mut`.

    ```mine
    let x = 42 // immutable
    mut y = 42 // mutable
    ```

    → [Mutability](https://maysara.blog/posts/mutability-in-mine)

    ---

- ### Private by default

    Everything is private to its declaring scope unless explicitly marked `pub`.

    ```mine
    fn helper() {..}  // private
    pub fn api() {..} // public
    ```

    → [Visibility](https://maysara.blog/posts/visibility-in-mine)

    ---

- ### Runtime by default

    All evaluation happens at runtime unless explicitly marked `comptime`.

    ```mine
    let x = heavyFn()           // runtime
    comptime let x = heavyFn()  // compile time
    ```

    - #### But... Numbers are comptime until pinned :P

        Plain integer and float literals have no concrete type (they're free-precision compile-time values until you assign or cast them).

        ```mine
        let x = 42          // comptime_int (no size, no limit)
        let x = 42 as i32   // pinned to i32
        let x = 42 as u256  // or any width you need

        let y = 3.14        // comptime_float (full f128 precision)
        let y = 3.14 as f32 // pinned to f32
        ```

        → [Evaluation Phases](https://maysara.blog/posts/evaluation-phases-in-mine)

        ---

_When in doubt (be explicit). When explicit (enjoy it)._