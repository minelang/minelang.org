---
title: "Unions"
icon: layers
weight: 137
---

Unions provide shared storage between fields. Three forms: bare (untagged), tagged with explicit tag, and inferred-tag `union(enum)` for match support.

---

- ## Bare union (untagged)

    ```mine
    let Value = union {
        int   : i64,
        float : f64,
    }
    ```

    No tag tracking which field is active. Accessing the wrong field is detectable illegal behavior. Cannot be used with `match`.

    To switch the active field, reassign the entire union value (you cannot assign through an individual field). Unlike structs and classes. which are always bound with `let` because field-level `mut` handles all mutations in place (bare unions have no tag and no field-level mutation path, so `mut` on the binding is required when you need to change the active field):

    ```mine
    mut v = Value { .int = 10 }
    v = Value { .float = 12.34 }  // now the float field is active
    ```

    ---

- ## Tagged union

    ```mine
    let Tag = enum { a, b }
    let Tagged = union(Tag) {
        a: u8,
        b: f32,
    }
    let v: Tagged = { .b = 1.5 }
    ```

    ---

- ## Inferred tag union

    ```mine
    let Shape = union(enum) {
        Circle : struct { radius: f32 },
        Rect   : struct { width: f32, height: f32 },
    }

    let s: Shape = { .Circle = { .radius = 5.0 } }
    ```

    Mine generates the enum tag from variant names. This is equivalent to declaring an explicit `Tag` enum by hand.

    ---

- ## `void` variant shorthand

    A variant of type `void` can omit the type annotation entirely:

    ```mine
    let Result = union(enum) {
        Ok: i32,
        Err: []u8,
        None,        // shorthand for None: void
    }
    ```

    ---

- ## Matching on tagged unions

    ```mine
    match v {
        .Circle |c| => @print("circle r={}", c.radius),
        .Rect   |r| => @print("rect {}x{}", r.width, r.height),
    }
    ```

    Exhaustive: all variants must be covered or `else` provided.

    ---

- ## Pointer capture for mutation

    Captured values in match arms are immutable by default. Use `|*field|` to capture a pointer and mutate the value:

    ```mine
    match v {
        .b |*f| => f.* *= 2.0,
        else    => {},
    }
    ```

    ---

- ## `@unionInit`

    To initialize a union when the active field name is only known at comptime, use `@unionInit`:

    ```mine
    let u = @unionInit(Shape, "Circle", { .radius = 5.0 })
    ```

    This is equivalent to `{ .Circle = { .radius = 5.0 } }` but allows the field name to be a comptime string expression rather than a literal.

    ---

- ## Tag coercion

    A tagged union tracks which variant is active using its tag (a value of the enum type it's bound to. Tag coercion lets you extract just that tag from a union value, discarding the payload):

    ```mine
    let Tag = enum { a, b }
    let Tagged = union(Tag) { a: u8, b: f32 }

    let v: Tagged = { .b = 1.5 }
    let t: Tag = v   // t == Tag.b  (payload 1.5 is discarded, you get the tag only)
    let t = v as Tag // explicit form, same result
    ```

    This is different from `match`: `match` opens the payload and lets you work with it. Tag coercion just answers "which variant is active?" without touching the payload at all.

    Useful when you need to compare or check the active variant without needing the value inside:

    ```mine
    // check if two union values hold the same variant
    let same_variant = (v1 as Tag) == (v2 as Tag)
    ```

    ---

- ## Modifiers

    ```mine
    let CUnion      = extern union { i: i32, f: f32 }  // C ABI layout
    let PackedUnion = packed union { a: u8, b: u8 }    // bit-level packing
    ```

    `extern union` guarantees C-compatible layout. `packed union` stores the value at the bit level with no padding.

    All fields in a `packed union` must have the same `@bitSizeOf` (differing sizes are a compile error):

    ```mine
    let Bad = packed union { a: u8, b: u16 }  // compile error: mismatched bit sizes
    ```

    Like `packed struct`, `packed union` values support `==` and `!=` by comparing their backing integer:

    ```mine
    let PackedUnion = packed union { a: u8, b: u8 }
    let x = PackedUnion { .a = 42 }
    let y = PackedUnion { .b = 42 }
    x == y  // true (same backing bits)
    ```

    ---