---
title: "@import"
icon: import_export
weight: 111
---

`@import("path")` loads a `.mine` (or `.m`) source file and returns a module handle of type `mod`. It is the primitive that underlies all module loading (the [`use`](./use) statement is sugar on top of it).

---

- ## `mod` type

    ```mine
    let m = @import("./math")   // like `let m : mod = ..`
    let f = m.add               // access an export
    m()                         // error: mod is not callable
    ```

    A `mod` value is not callable and cannot be used in expressions. Its only purpose is to give access to exported symbols via `.`.

    ---