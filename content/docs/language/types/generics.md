---
title: "Generics"
icon: dynamic_feed
weight: 143
---

Generics allow type parameterization with `<T>` syntax. Both functions and type constructors use `<T>`.

---

- ## Generic functions

    ```mine
    fn first<T>(arr: []T) T {
        return arr[0]
    }

    fn pair<A, B>(a: A, b: B) .{ A, B } {
        return .{ a, b }
    }

    fn identity<T>(x: T) T {
        return x
    }

    fn swap<A, B>(a: A, b: B) .{ B, A } {
        return .{ b, a }
    }
    ```

    Type inference is preferred (explicit `<T>` at the call site also works):

    ```mine
    let x = identity(42)          // T -> comptime_int (inferred)
    let x = identity<i32>(42)     // T -> i32 (explicit)
    let x = identity(42 as i32)   // T -> i32
    ```

    ---

- ## Generic structs

    ```mine
    let Box<T> = struct {
        value: T,
    }
    ```

    ---

- ## Generic enums

    ```mine
    let Option<T> = enum {
        Some(T),
        None,
    }
    ```

    ---

- ## Generic interfaces (`def`)

    ```mine
    def Container<T> {
        inner: T,
    }
    ```

    ---

- ## Generic classes

    ```mine
    let Box<T> = class {
        Self(pub value: T) {}
    }
    let b = Box(42)         // T -> comptime_int (inferred)
    let b = Box<i32>(42)    // T -> i32 (explicit)
    let b = Box(42 as i32)  // T -> i32
    ```

    ---

- ## Constraints

    Use `:` to constrain a type parameter to an interface, and **`|`** to combine multiple constraints:

    ```mine
    def Named { name : []u8 }
    def Aged  { age  : i32  }

    fn print_all<T: Named>(items: []T) void {
        ...
    }

    fn process<T: Named|Aged>(item : T) void {
        ...
    }

    class Registry<T: Named> {
        Self(pub item: T) {}
        pub fn label() []u8 { this.item.name }
    }

    class Profile<T: Named|Aged> {
        Self(pub data: T) {}
    }
    ```

    Constrained generics use monomorphization (each `T` produces a separate compiled version with zero runtime overhead).

    ---

- ## Comptime value parameters

    ```mine
    fn array<T>(comptime n: i32) [n]T { ... }
    ```

    ---
