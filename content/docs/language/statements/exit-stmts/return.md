---
title: "return"
icon: logout
weight: 151
---

`return` exits a function with a value (or with `void`). For exiting with an error instead, see [`fail`](./fail).

---

- ## Basic return

    ```mine
    fn double(x: i32) i32 { return x * 2 }
    fn log() void { return }
    ```

    ---

- ## Trailing expression

    Trailing expressions also serve as return values (`return` is optional at the end):

    ```mine
    fn double(x: i32) i32 { x * 2 }
    ```

    Prefer `return` when exiting from nested branches or when clarity matters.

    ---