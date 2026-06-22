---
title: "unreachable"
icon: block
weight: 155
---

`unreachable` asserts code cannot be reached (panics in debug, undefined behavior in release). Combined with the `never` return type for diverging functions.

---

- ## never type

    ```mine
    fn assert(cond: bool) void {
        if not cond { unreachable }
    }
    ```

    `unreachable` asserts that the current code point is never executed. In debug builds it panics. In release builds it is undefined behavior (giving the optimizer more freedom).

    A function that provably never returns may be annotated with `never`:

    ```mine
    fn infinite() never {
        loop { }
    }
    ```

    Functions returning `never` must have no path that reaches the end.

    ---

