---
title: "Structs"
icon: inventory_2
weight: 136
---

Structs are product types with named fields. Support default values, mutable fields, methods, static members, generics, auto-deref on pointer access, and layout modifiers (extern, packed).

---

- ## Declaration

    Every field must be explicitly declared with `let` or `mut`. Fields are private by default. use `pub` to make them accessible outside the struct. Omitting `let`/`mut` is a syntax error (see [`def`](../bindings/def)).

    ```mine
    let Point = struct {
        pub let x: f32,
        pub let y: f32,
    }
    ```

    Structs are value types. All fields must be initialized (missing a field is a compile error). Mine gives no guarantees about the in-memory order or size of fields.

    Like classes, struct instances are always bound with `let`, never `mut` (there is no `mut x = struct {...}`). Mutability is controlled entirely by each field's own `let`/`mut` declaration inside the body (see [Mutable fields](#mutable-fields) below). Unions are the exception: since switching a union's active variant requires a full value reassignment, union bindings may use `mut` (see [Unions](../types/unions)).

    Note the asymmetry between definition and construction: inside the `struct { }` body, field names have no leading dot and `:` introduces a *type*. When constructing an instance, field names take a leading dot and use `=` assigns a *value* (see [Construction](#construction) below).

    ---

- ## Field visibility and mutability

    The two keywords compose independently:

    | Declaration    | Readable outside | Writable outside |
    | -------------- | ---------------- | ---------------- |
    | `let x: T`     | ✗ (private)      | ✗                |
    | `mut x: T`     | ✗ (private)      | ✗                |
    | `pub let x: T` | ✓                | ✗                |
    | `pub mut x: T` | ✓                | ✓                |

    `pub` controls access from outside the struct's module. `mut` controls whether the field can be written to. Both must be satisfied for an external write: a `pub let` field can be read but not assigned from outside, regardless of how the struct binding is declared.

    ```mine
    let Pos = struct {
        pub let  x: f32,   // readable outside, immutable
        pub mut  y: f32,   // readable and writable outside
        prv let  z: f32,   // private, immutable (same as bare `let z: f32`)
    }
    ```

    Unqualified `let x: T` and `mut x: T` (no `pub`) are equivalent to `prv let x: T` / `prv mut x: T`.

    ---

- ## Struct naming

    When a struct is assigned to a named binding, the type's name is inferred from that binding:

    ```mine
    let Point = struct { pub let x: f32, pub let y: f32 }
    // The type is now named "Point", visible in error messages and @typeName
    ```

    Structs created in other ways (returned from functions, assigned to anonymous bindings) receive a compiler-generated name based on their location in the source.

    ---

- ## Construction

    ```mine
    let Point = struct {
        pub let x: f32,
        pub let y: f32,
    }

    let p = Point { .x = 1.0, .y = 2.0 }
    ```

    Field names take a leading dot and use `=` to assign the value (`:` is only used for type annotations at definition time, never at construction time).

    Private fields are inaccessible from outside the struct's module (use a `pub fn init` instead (see [Methods](#methods))). Code inside the struct body (including its methods) can always construct the struct with any fields, including private ones.

    ---

- ## Anonymous struct literal

    When the type can be inferred from context, the type name can be omitted:

    ```mine
    let p: Point = Point { .x = 1.0, .y = 2.0 } // ok (ugly)
    let p: Point =       { .x = 1.0, .y = 2.0 } // ok (not bad)
    let p        = Point { .x = 1.0, .y = 2.0 } // ok (recommended)
    let like_p   =       { .x = 1.0, .y = 2.0 } // ok (anonymous struct)

    ```

    Fully anonymous structs (without coercing to a named type) are also valid and are typed structurally:

    ```mine
    fn dump(args: any) void { ... }
    dump({ .x = 1, .msg = "hi" }) // anonymous, no declared type
    ```

    ---

- ## Mutable fields

    Mutability is per-field, not per-binding. Declaring a field `mut` is what allows its value to be updated. Struct instances are always bound with `let` (see above). the field's own `let`/`mut` is the only thing that determines whether it can be written.

    ```mine
    let MutablePoint = struct {
        pub let x: f32, // immutable field
        pub mut y: f32, // mutable field
    }

    let p = MutablePoint { .x = 1.0, .y = 2.0 }
    p.y = 3.0 // ok (field is `mut`)
    p.x = 9.0 // compile error (field is `let`)
    ```

    ---

- ## Default values

    ```mine
    let Config = struct {
        pub let port: u16  = 8080,
        pub let host: []u8 = "localhost",
    }
    let cfg = Config {}
    ```

    Default values are evaluated at comptime. A default must not depend on another field's value or on runtime state (that is a compile error).

    **Invariant safety:** only use defaults when omitting a field cannot put the struct into an invalid state. If fields have interdependencies (e.g. `min` and `max` that must satisfy `min ≤ max`), leave them without defaults and require explicit construction through a `pub fn init` that validates the invariant.

    ---

- ## Methods

    Methods in Mine follow four distinct rules based on their signature, giving you precise control over the implicit `this` context and mutability:

    1. **Immutable method (`fn`)**: Provides an implicit, read-only `this`.
    2. **Mutable method (`mut fn`)**: Provides an implicit, writable `this`.
    3. **Manual method (`fn(self: *Self)` / `fn(self: *mut Self)`)**: Explicit pointer parameter cancels the implicit `this`.
    4. **Static method (`static fn`)**: Independent utility/factory function, has no `this`, and cannot be called on an instance.

    ```mine
    let Stuff = struct {
        pub mut x: i32,
        pub mut y: i32,

        // 1. Immutable method: implicit read-only `this`, cannot write any field
        pub fn sum() i32 {
            this.x + this.y
        }

        // 2. Mutable method: implicit writable `this`, can write mut fields
        pub mut fn swap() void {
            let tmp = this.x
            this.x = this.y
            this.y = tmp
        }

        // 3. Manual method: explicit pointer parameter, no implicit `this`
        //    *mut Self: allows writing to mut fields through the pointer
        //    *Self:     read-only (writing through it is a compile error)
        pub fn swapManual(self: *mut Self) void {
            self.swap() // auto-deref: desugars to Stuff.swap(self)
        }

        // 4. Static method: no `this`, no instance parameter
        pub static fn init(x: i32, y: i32) Self {
            Self { .x = x, .y = y }
        }
    }
    ```

    ---

- ## Manual methods and pointer mutability

    When you write an explicit `self` parameter, you are passing a pointer to the struct. The pointer's own mutability controls what you can do through it. independent of the struct binding (which is always `let`) and independent of each field's `let`/`mut` declaration (which is still the final gate on whether a specific field can be written):

    | Parameter type    | Can read fields | Can write `mut` fields | Can write `let` fields |
    | ----------------- | --------------- | ---------------------- | ---------------------- |
    | `self: *Self`     | ✓               | ✗ (compile error)      | ✗ (compile error)      |
    | `self: *mut Self` | ✓               | ✓                      | ✗ (compile error)      |

    ```mine
    let Point = struct {
        pub mut x: f32,
        pub let y: f32,

        // Read-only pointer: can only read, even if fields are `mut`
        pub fn getX(self: *Self) f32 {
            self.x          // ok: reading
        }

        // Read-write pointer: can write to `mut` fields
        pub fn setX(self: *mut Self) void {
            self.x = 0.0   // ok: *mut Self + field is `mut`
        }

        // Read-write pointer: but `let` field is still protected
        pub fn trySetY(self: *mut Self) void {
            self.y = 0.0   // compile error: field is `let`
        }
    }
    ```

    The struct binding is always `let` (there is no `mut p = Point { ... }`). `*mut Self` is not about the binding; it is a property of the pointer itself, granting write access through the pointer for this call. It is how you pass a writable reference to another function or store it somewhere.

    In practice, prefer `fn` / `mut fn` with implicit `this` for normal methods. Use the manual `*Self` / `*mut Self` form only when you need to pass the receiver further (to a C function, store it in a struct, hand it to a callback, etc).

    ---

- ## `Self`

    Inside a struct body, `Self` refers to the struct type being declared. Useful for self-referential types:

    ```mine
    let Node = struct {
        pub let value : i32,
        pub let next  : ?*Self = null,
    }
    ```

    ---

- ## `comptime` fields

    A field can be marked `comptime`, meaning it exists only at compile time and contributes no bytes to the struct layout:

    ```mine
    let Meta = struct {
        pub comptime let kind: []u8 = "point",
        pub let x: f32,
        pub let y: f32,
    }
    ```

    All instances of the struct must have the same comptime field value. it acts more like a type-level tag than a per-instance value.

    ---

- ## Generic struct

    ```mine
    let Pair<T> = struct {
        pub let a: T,
        pub let b: T,
    }

    let p1 = Pair<i32> { .a = 1, .b = 2 }   // T is explicitly i32
    let p2 = Pair      { .a = 1, .b = 2 }   // T inferred as int

    let x: i64 = some_value
    let y: i32 = some_value
    let p3 = Pair { .a = x, .b = y }        // error: T can't unify i64 and i32.
                                            // both are concrete (non-literal) types,
                                            // and Mine has no hidden/implicit casts

    let p4 = Pair { .a = x, .b = 2 }        // ok: T inferred as i64. `b` is a bare
                                            // comptime literal, which the compiler fits
                                            // into i64 automatically since it fits
    ```

    When the type argument is omitted, `T` is inferred from the field values. A comptime-known integer literal has no fixed type yet, so the compiler freely fits it into whatever concrete type `T` resolves to, as long as the value fits (this isn't a cast, just normal comptime inference). Once a value has a concrete, non-literal type (like `x: i64` above), Mine never inserts an implicit cast to reconcile it with a different concrete type (mixing two different concrete types for the same `T` is a compile error).

    ---

- ## Static members

    ```mine
    let Config = struct {
        pub let port: u16 = 8080,

        pub static let VERSION = "0.1.0"
        pub static mut COUNT: u32 = 0

        // Static function: completely independent, no implicit 'this'
        pub static fn getVersion() string {
            Self.VERSION
        }
    }

    Config.VERSION      // "0.1.0", no instance needed
    Config.getVersion() // "0.1.0"
    ```

    `static let`/`static mut` declare type-level state, shared across every instance rather than stored per-instance (unlike a regular `let`/`mut` field, which is part of each instance's data). They're accessed through the type name (`Config.VERSION`), not through an instance, and exist independently of whether any instance has ever been constructed. This is identical to static members on a [class](../types/classes#static-members); the only difference is that a struct has no `this` to begin with, so there's no implicit-receiver distinction to make for `static fn` (see [Methods](#methods) above).

    ---

- ## Modifiers

    ```mine
    let CPoint   = extern struct { pub let x: f32, pub let y: f32 }  // C ABI layout
    let BitField = packed struct { pub let a: u2,  pub let b: u6  }  // bit-level packing
    ```

    `extern struct` guarantees C-compatible field layout and padding. `packed struct` stores fields contiguously at the bit level with no padding. fields can be any integer width.

    `packed struct` values support `==` and `!=` by comparing their backing integer representation:

    ```mine
    let Flags = packed struct { pub let a: u1, pub let b: u1, pub let c: u6 }
    let f1 = Flags { .a = 1, .b = 0, .c = 0 }
    let f2 = Flags { .a = 1, .b = 0, .c = 0 }
    f1 == f2  // true
    ```

    ---