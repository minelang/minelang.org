---
title: "Classes"
icon: code
weight: 140
---

Classes are nominal types managed by the compiler. They must be bound with `let` (`class { }` is a type-expression). Classes have constructors, destructors, methods, field promotion, overloading, generics, and static members.

Unlike structs, classes are constructed by calling the type as a function `ClassName(...)` not with a field literal like `MyStruct { .field = value }`. This follows from having a constructor: construction is a function call into `Self(...)`, not a direct field-by-field literal.

---

- ## Basic class

    ```mine
    let Counter = class {
        mut count: i32 = 0,

        // No Self() needed: all fields have defaults, compiler generates Self() {} automatically.

        // Using mut fn because we are modifying this.count
        mut fn increment(amount: i32) void {
            this.count += amount
        }

        // Using fn because we only read this.count without modifying it
        fn value() i32 { this.count }
    }

    let c = Counter()
    c.increment(5)
    c.value() // 5
    ```

    `this` is the implicit receiver inside every non-static method and constructor (it is never declared in the parameter list, only used in the body). Static methods are the only exception: they have no receiver. `Self` is an alias for the enclosing type's name, usable anywhere you'd otherwise repeat it (constructor/destructor names, type positions like `?*Self`, etc.).

    ---

- ## Constructor

    ```mine
    let Person = class {
        pub let name: string
        let age: i32

        Self(name: string, age: i32) {
            this.name = name  // ok: constructors may write `let` fields (one-time initialization)
            this.age = age
        }
    }

    let p = Person("Ada", 30)
    ```

    `Self(...)` defines a constructor. Multiple constructors are allowed, overloaded by parameter types. `let` fields are immutable after construction. a constructor body is the only place they may be assigned. Any attempt to write a `let` field outside a constructor is a compile error.

    If every field has a default value, the constructor can be omitted entirely (the compiler generates a zero-argument `Self() {}` automatically):

    ```mine
    let Timer = class {
        mut elapsed: f32 = 0.0,
        mut running: bool = false,
        // compiler generates: Self() {}
    }

    let t = Timer()
    ```

    If any field lacks a default, a constructor must be provided explicitly.

    Unlike structs, classes **do not** use the manual `self: *Self` / `self: *mut Self` parameter pattern in their methods. Since `this` is always available in every non-static class method, writing an explicit pointer parameter only adds noise. The manual pointer form is a struct feature for cases where you need to pass the receiver to a C function, store it, or hand it to a callback.

    ---

- ## Destructor

    ```mine
    let Resource = class {
        let handle: i32

        Self() { this.handle = open() }
        ~Self() { close(this.handle) }
    }
    ```

    `~Self()` runs when the instance goes out of scope.

    ---

- ## Constructor field promotion

    Mutability must always be written explicitly on a promoted field (there's no implicit default):

    ```mine
    let Vec2 = class {
        Self(pub let x: f32, prv mut y: f32, z: f32) {}
    }
    ```

    - `pub let x: f32` → `x` is a public, immutable field, initialized from the constructor parameter
    - `prv mut y: f32` → `y` is a private, mutable field, initialized from the constructor parameter
    - `z: f32` → local-only, not stored as a field (no `pub`/`prv` and no `let`/`mut` means it's just a regular parameter, not a promotion)

    ---

- ## Fallible constructor

    ```mine
    let User = class {
        let username: string

        Self(username: string) Errors!Self {
            if username.len == 0 { fail EmptyUsername }
            this.username = username
        }
    }
    ```

    A constructor can return `Errors!Self` instead of constructing unconditionally, where `Errors` is an error set. `fail` raises an error from within the constructor body, aborting construction. Error sets and `fail` are documented in full in the (forthcoming) errors reference (this is just the constructor-specific usage).

    ---

- ## Generic class

    ```mine
    let Box<T> = class {
        Self(pub let value: T) {}
    }

    let b1 = Box<i32>(42)   // T -> i32 (explicit)
    let b2 = Box(42)        // T -> int (inferred)
    let b2 = Box(42 as i32) // T -> i32 (explicit + inferred)
    ```

    ---

- ## Static members

    ```mine
    let Config = class {
        pub static let VERSION = "0.1.0"
        pub static mut COUNT: u32 = 0

        // Static function: completely independent, no implicit 'this'
        pub static fn getVersion() string {
            Self.VERSION
        }
    }
    ```

    ---

- ## Inheritance?

    well...
    why not!

    honestly, it is a highly useful mechanism. But it ultimately **leads to the hell**. However, **programmers can never truly escape the hell!** so... yeah! maybe one day. just not today :P

    for now, you can use composition or `union(enum)` for polymorphic behavior.

    ---