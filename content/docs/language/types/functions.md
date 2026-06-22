---
title: "Functions"
icon: gesture
weight: 142
---

Function types are first-class types using `fn(T) R` syntax. They can be bound with `let` and used for higher-order functions and callbacks.

---

- ## Syntax

    ```mine
    let Adder      = fn(i32, i32) i32
    let Greeter    = fn(name: []u8) void
    let WithErrors = fn(name: []u8) !void
    ```

    ---

- ## Function values

    ```mine
    let add   : Adder   = fn(a, b) { a + b }
    let greet : Greeter = fn(name) { @print("hello") }
    ```

    Parameter types may be omitted in the literal when inferable from the binding type.

    ---

- ## Higher-order functions

    ```mine
    let apply: fn(fn(i32) i32, i32) i32 = fn(f, x) { f(x) }
    ```

    ---


