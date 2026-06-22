---
title: "impl"
icon: extension
weight: 125
---

`impl` blocks attach methods to any existing type (primitives, structs, classes, enums, or interfaces). Operator overloading is only valid inside `impl` blocks.

---

- ## Basic syntax

    ```mine
    impl Point {
        pub fn magnitude() f32 {
            std.math.sqrt(this.x * this.x + this.y * this.y)
        }
    }
    ```

    Inside an `impl` block, `this` refers to the receiver (the value the method is called on).

    Methods follow the same `fn` / `mut fn` distinction as struct and class methods (see [Structs](../types/structs#methods)):

    - in **`fn`**, `this` is read-only. Assigning to any `this.field` inside a plain `fn` is a compile error, even if that field is itself declared `mut`.

    - in **`mut fn`**, `this` is writable, meaning assignment to `this.field` is permitted *for fields declared `mut`*. Assigning to a `this.field` that is itself declared `let` is still a compile error, even inside a `mut fn`.

    ```mine
    impl Counter {
        pub fn value() i32 { this.count }               // read-only
        pub mut fn increment() void { this.count += 1 } // needs `mut fn`, since it writes this.count
    }
    ```

    This is independent of how the instance itself is bound. Struct and class instances are always bound with `let` (see [Structs](../types/structs) and [Classes](../types/classes)) (there is no `mut x = struct {...}` or `mut x = class {...}`). Whether a field can be written is controlled entirely by that field's own `let`/`mut` declaration inside the body, plus whether the method touching it is declared `mut fn`:

    ```mine
    let Counter = class {

        // mut field: can be written by mut fn methods
        Self(pub mut count: i32 = 0) {}

        pub fn value() i32 {
            this.count      // ok: reading in a plain fn
        }

        pub mut fn increment() void {
            this.count += 1 // ok: mut fn + mut field
        }

    }

    let c = Counter()
    c.increment() // ok (binding is `let`, but that's irrelevant. the field is `mut`)
    ```

    ---

- ## Operator overloading

    ```mine
    impl Point {
        pub op +(other: Point) Point {
            Point { .x = this.x + other.x, .y = this.y + other.y }
        }
        pub op ==(other: Point) bool {
            this.x == other.x and this.y == other.y
        }
        pub op [](idx: i32) f32 {
            if idx == 0 { this.x } else { this.y }
        }
    }
    ```

    See [`Operators`](../expressions/operators)

    ---

    - ### Overloadable operators

        | Category            | Operators                    |
        | ------------------- | ---------------------------- |
        | Arithmetic          | `+` `-` `*` `/` `%`          |
        | Comparison          | `==` `<` `>` `<=` `>=`       |
        | Indexing            | `[]` (getter) `[]=` (setter) |
        | Unary               | `-` `~`                      |
        | Increment/Decrement | `++` `--`                    |

        `!=` is auto-derived from `==` and cannot be overloaded directly.

        `++` and `--` follow the same `mut` rule as methods: since they mutate `this`, they must be declared `mut op`. They are prefix-only (`++i`, `--i` no postfix form exists in mine) and **must return `void`**. This isn't a special rule just for these two operators, it's the same general type-checking rule that rejects using any `void` value where a non-`void` value is expected, applied here so `++i`/`--i` can only ever be used as standalone statements, never as a value:

        ```mine
        impl Counter {
            pub mut op ++() void { this.value += 1 }
            pub mut op --() void { this.value -= 1 }
        }
        ```

        Declaring an `op ++`/`op --` with a non-`void` return type is a compile error. The `[]=` setter is mutating for the same reason and likewise requires `mut op []=`, while the `[]` getter and the non-mutating arithmetic/comparison operators (`+`, `==`, etc.) stay as plain `op` since they return a new value instead of writing to `this`.

        ---

    - ### Never overloadable

        `as` `into` `and` `or` `not` `&&` `||` `!` `|` `&` `^` `<<` `>>` `.` `=`

        Every primitive type (`uN`, `iN`, `fN`, `bool`, arrays, etc.) ships with a **compiler-built-in `impl`** for its arithmetic, comparison, increment/decrement, and (for arrays) `+` concatenation operators. These built-in impls are intrinsic to the compiler and resolved with zero runtime cost. they cannot be re-implemented or overridden by user code, even from within an `impl` block on that primitive type.

        ---

- ## Visibility

    Methods follow the same `pub` rules as top-level declarations. Without `pub`, a method is private to its `impl` block.

    ```mine
    impl i32 {
        pub fn square() i32 { this.internalSquare() }  // callable anywhere
        fn internalSquare() i32 { this * this }        // private to this impl
    }
    ```

    ---

- ## Exporting impl blocks

    An `impl` block is module-private by default. Marking it `pub` makes it importable by other modules.

    ```mine
    pub impl i32 {
        pub fn double() i32 { this * 2 }
    }
    ```

    Importing modules can then bring it in via `use *` (which includes all public items, impl blocks included) or the targeted `use impl` form (see [`use`](../modules/use)).

    Global files (`.g.mine`) are the recommended place for `pub impl` blocks on built-in or widely shared types. they are automatically available project-wide, and package consumers can import your impl blocks directly without any extra wiring.

    ---

- ## Duplicate impl blocks

    If two imported files define a `pub impl` for the same type and the same method, the last import wins. This is intentional and allows downstream code to override upstream behavior.

    ---