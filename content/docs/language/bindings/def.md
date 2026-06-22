---
title: "def"
icon: shapes
weight: 122
---

`def` defines structural interfaces (shape-only requirements that a type must satisfy). They compile to [`structs`](../types/structs), support generic parameters, and compose by listing other interfaces as members.

---

- ## Basic syntax

    ```mine
    def Point {
        x: f32,
        y: f32,
    }

    def Empty {}

    def Named {
        name: []u8,
    }
    ```

    Interfaces contain only fields. no methods, no visibility modifiers, no default values. All fields are implicitly public.

    ---

- ## Generic interfaces

    ```mine
    def Wrapper<T> {
        inner: T,
    }

    def Pair<A, B> {
        first:  A,
        second: B,
    }
    ```

    ---

- ## Composition

    ```mine
    def Labeled {
        label: []u8,
    }

    def Described {
        description: []u8,
    }

    def LabeledPoint {
        Point,
        Labeled,
        Described,
    }
    ```

    List another interface by name inside the body to merge in all of its fields. `LabeledPoint` requires every field from `Point`, `Labeled`, and `Described` combined.

    Composed members and new fields can be mixed freely in the same declaration:

    ```mine
    def LabeledPoint {
        Point,
        Labeled,
        Described,
        with_field: bool,  // a regular field alongside the composed interfaces
    }
    ```

    The resulting interface inherits all fields from each composed member plus any fields declared directly. Field name conflicts (whether between two composed members or between a composed member and a direct field) are a compile error.

    ---

- ## As a type constraint

    ```mine
    fn printPoint(p: Point) void {
        @printn("{} {}", p.x, p.y)
    }
    ```

    Any type that satisfies `Point`'s fields can be passed here. `def` interfaces act as structural constraints (no explicit implementation declaration needed).

    ---

- ## Why `def` and not `interface`?

    `def` was chosen to keep keyword lengths consistent with `let` and `mut`:

    ```
    let.len       = 3
    mut.len       = 3
    def.len       = 3  ✓ (OCPD-approved)
    interface.len = 9  ✗
    ```

    Using `interface` is a syntax error (auto-fixable via `mine fmt`).

    ---