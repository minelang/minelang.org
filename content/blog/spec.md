---
title: Mine Language Specification
description: "Mine language spec: syntax, semantics, types, literals, bindings."
tags: ["draft"]
date: 2026-06-08
author: "Maysara"
icon: format_letter_spacing_wider
readingTime: 14
weight: 1
---

- ## Philosophy

    Three defaults. Everything follows from them:

    - **Immutable by default** (use `mut` to opt in)
    - **Private by default** (use `pub` to opt in)
    - **Runtime by default** (use `comptime` to opt in)

    Mine is what you get when a C++, Zig, and Rust engineer designs a language from scratch, taking only what works from each, leaving the legacy behind, with a touch of TypeScript ergonomics in the syntax.

    - **C++** - expressiveness, OOP, RAII, operator overloading
    - **Zig** - comptime, clean tooling, explicit control, no hidden magic
    - **Rust** - `match`, optionals, error handling, `impl` blocks
    - **TypeScript** *(flavor)* - constructor shorthand, structural shapes, concise syntax

    The final self-hosted implementation will have no LLVM or Zig dependency (compiled entirely by Mine itself).

    ---

- ## Primitives

    | Type                        | Description                                                                               |
    | --------------------------- | ----------------------------------------------------------------------------------------- |
    | `iN`, `uN`                  | Signed/unsigned integers, arbitrary width (i1..i65535, u1..u65535)                        |
    | `f16`, `f32`, `f64`, `f128` | Floating-point                                                                            |
    | `bool`                      | `true` or `false`                                                                         |
    | `void`                      | No value                                                                                  |
    | `never`                     | Function never returns, body must diverge (infinite loop, `fail`, etc.)                   |
    | `any`                       | Opts out of type checking, comptime-only (use sparingly)                                  |
    | `type`                      | A type itself (comptime contexts)                                                         |
    | `comptime_int`              | Untyped integer literal                                                                   |
    | `comptime_float`            | Untyped float literal (f128 precision)                                                    |

    > **`never` example:** A function returning `never` must provably never return:
    > ```mine
    > fn x() { }             // fn x() void
    > fn x() { unreachable } // fn x() never
    > ```

    ---

- ## Literals

    Plain literals have no concrete type until pinned:

    ```mine
    let x = 42              // comptime_int
    let x = 42 as i32       // i32
    let x: i64 = 42         // i64

    let y = 3.14            // comptime_float
    let y = 3.14 as f32     // f32

    let c = 'A'             // comptime_int
    let c = 'A' as u8       // u8
    let c = '€' as u21      // u21 (Unicode scalar - chars are just integers)

    let s = "hello"         // []u8 (immutable slice, string literals are always immutable)
    ```

    ---

- ## Bindings

    ```mine
    let x = 42              // immutable
    mut y = 42              // mutable

    pub let x = 42          // public immutable (module or class level)
    pub mut y = 42          // public mutable (module or class level)
    prv let x = 42          // explicitly private (same as omitting modifier, exists for readability)

    comptime let x = 42     // compile-time (private)
    pub comptime let x = 42 // compile-time (public)
    ```

    ---

- ## Type Definitions (`def`)

    `def` unifies type aliases, shapes, enums, unions, and tagged unions:

    - ### Type alias

        ```mine
        def UserId = i32
        def Matrix = [][]f32
        ```

    - ### Shape (struct-like)

        Fields only (no methods). Satisfied structurally by anonymous objects:
        ```mine
        def Point {
            x: f32
            y: f32
        }

        def Vec2 {
            x: f32
            y: f32
        }

        let p: Point = { x: 1.0, y: 2.0 }          // OK
        let p: Point = { x: 1.0, y: 2.0, z: 3.0 }  // CompilerError (extra field)
        let p        = { x: 1.0, y: 2.0, z: 3.0 }  // OK (anonymous type)
        ```

        Shapes are structural (any object with matching fields satisfies them). Classes are nominal (`Vec2` is never assignable to `Point` even with identical fields).

    - ### Enum

        ```mine
        def Direction = .North | .South | .East | .West

        // enums can be merged into a superset
        def ReadPerms  = .Read
        def WritePerms = .Write | .Append
        def AllPerms   = ReadPerms | WritePerms   // .Read | .Write | .Append
        ```

    - ### Union

        ```mine
        def Value = i32 | bool | []u8

        let v: Value = 42 as i32

        match v {
            i32(n)   => { n * 2 }
            bool(b)  => { if b { 1 } else { 0 } }
            []u8(s)  => { s.len as i32 }
        }
        ```

    - ### Tagged union

        Variants carry data. Each variant is declared on its own line with a leading `|`:
        ```mine
        def Shape =
            | .Circle { radius: f32 }
            | .Rect   { width: f32, height: f32 }

        let s: Shape = .Circle { radius: 5.0 }

        match s {
            .Circle(c) => { c.radius * c.radius }
            .Rect(r)   => { r.width * r.height }
        }
        ```

    - ### Generic def

        ```mine
        def Wrapper<T> { value: T } // generic shape
        def Pair<A, B> { first: A, second: B }
        ```

        ---

- ## Functions (`fn`)

    ```mine
    pub inline comptime fn ident(params) errset!type {..}
    ```

    | Qualifier  | Meaning                              |
    | ---------- | ------------------------------------ |
    | `pub`      | visible outside declaring scope      |
    | `prv`      | explicitly private (same as default) |
    | `inline`   | hint to inline at call sites         |
    | `comptime` | evaluated at compile time            |

    ```mine
    fn helper() {..}                     // private, runtime
    prv fn helper() {..}                 // explicitly private (same as above)
    pub fn api() i32 {..}                // public
    pub inline fn fast() {..}            // inlined
    comptime fn buildTable() {..}        // compile-time
    pub comptime fn schema() {..}        // public compile-time
    ```

    - ### Parameters

        ```mine
        fn f(x: i32) {..}              // immutable (default)
        fn f(mut x: i32) {..}          // mutable local copy
        fn f(x: *mut i32) {..}         // mutate caller's value
        fn f(comptime x: i32) {..}     // comptime-known at call site
        fn f(...args: i32) {..}        // variadic (typed)
        fn f(...args) {..}             // variadic (any type)
        ```

    - ### Return type inference

        ```mine
        fn double(x: i32) { return x * 2 }         // inferred i32
        pub fn double(x: i32) i32 { return x * 2 } // explicit (preferred for pub)
        ```

    - ### Overloading

        ```mine
        fn add(a: i32, b: i32) i32 { return a + b }
        fn add(a: f32, b: f32) f32 { return a + b }
        ```

    - ### Comptime functions

        ```mine
        comptime fn kilobytes(n: i32) i32 {
            return n * 1024
        }

        comptime fn makeVersion(major: i32, minor: i32, patch: i32) i32 {
            return (major * 10000) + (minor * 100) + patch
        }

        comptime let BUFFER_SIZE = kilobytes(64)        // 65536, known at compile time
        comptime let VERSION     = makeVersion(1, 2, 0) // 10200, known at compile time
        ```

        ---

- ## Classes

    ```mine
    class ident(Base) {
        fields
        ctor
        ~dtor
        methods
    }
    ```

    | Part     | Meaning                              |
    | -------- | ------------------------------------ |
    | `(Base)` | single inheritance                   |
    | `<T>`    | generic type parameter               |
    | `~dtor`  | destructor (runs when instance ends) |

    ```mine
    class Animal {
        Animal(pub mut name: []u8)
        pub fn speak() []u8 { return this.name } // subclasses may override this
        ~Animal() {..}
    }
    ```

    - ### Constructor shorthand

        `pub`/`prv` before a parameter promotes it to a field:
        ```mine
        class Point {
            Point(pub x: f32, pub y: f32)
            //    ^^^         ^^^
            //    public fields
        }

        class User {
            User(pub username: []u8, prv password: []u8)
            // plain param (no pub/prv) = local only, not a field
        }
        ```

    - ### Static members

        Static fields must be immutable (to avoid hidden shared mutable state across all instances):
        ```mine
        class Config {
            pub static let VERSION = "0.1.0"
            pub static fn default() Config {..}
            pub static mut count = 0   // CompilerError: static fields must be immutable
                                       // use module-level mut bindings for mutable shared state
        }

        Config.VERSION
        Config.default()
        ```

    - ### Inheritance

        Single inheritance only. Subclasses inherit all `pub` fields and methods, and can override them:
        ```mine
        class Dog(Animal) {
            Dog(mut name: []u8) {
                super(name) // must call base constructor first
            }
            pub fn fetch() {..}
            pub fn speak() []u8 { return "Woof! I am " + this.name } // overrides Animal.speak
        }
        ```

    - ### Generic classes

        ```mine
        class Box<T> {
            Box(pub value: T)
        }

        let b = Box(42 as i32)            // T inferred as i32
        let b: Box<i32> = Box(42 as i32)  // explicit
        ```

        ---

- ## Generics

    `<T>` on classes, defs, and functions:

    ```mine
    // constrained - Named and Aged are regular shapes used as generic constraints
    def Named { name: []u8 }
    def Aged   { age: i32  }

    class Registry<T: Named> {
        Registry(pub item: T)
        pub fn label() []u8 { return this.item.name }
    }

    // multiple constraints (& here is a constraint combinator, not bitwise AND)
    class Profile<T: Named & Aged> {
        Profile(pub data: T)
    }

    // generic function
    fn identity<T>(x: T) T { return x }

    fn swap<A, B>(a: A, b: B) [B, A] { return [b, a] }
    ```

    Monomorphization (each `T` produces a separate compiled version, zero runtime overhead).

    ---

- ## `impl` Blocks

    Add methods to existing types. Inside an `impl` block, `this` refers to the value the method is called on (by value for primitives, by reference for classes). The `impl` block itself is module-private by default, mark it `pub` to export its methods to importers:

    ```mine
    // both blocks below are in the same file:
    impl i32 {
        pub fn square() i32 { return this * this }      // callable anywhere in this module
        fn helper() i32 { return this + 1 }             // private to this file
    }

    pub impl i32 {
        pub fn cube() i32 { return this * this * this } // exported to importers
    }

    let x = 5 as i32
    x.square()  // 25
    x.cube()    // 125
    ```

    Works on any type: primitives, classes, defs.

    > `impl` methods are NOT inherited by subclasses. Only methods defined inside the `class` body are inherited.

    - ### Operator overloading

        Via `op` keyword inside `impl`. The following example assumes `Point` is a class with `x` and `y` fields:
        ```mine
        impl Point {
            pub op +(other: Point) Point {
                return Point(this.x + other.x, this.y + other.y)
            }
            pub op ==(other: Point) bool {
                return this.x == other.x and this.y == other.y
            }
            pub op [](idx: i32) f32 {
                // simplified example (a real impl would panic on out-of-bounds idx)
                return if idx == 0 { this.x } else { this.y }
            }
        }

        let p3 = p1 + p2
        if (p1 == p2) {..}
        let x = p1[0]
        ```

        ---

- ## Optionals

    ```mine
    let x: ?i32 = null
    let x: ?i32 = 42 as i32
    let y = x orelse 0 as i32  // preferred Mine style
    let y = x ?? 0 as i32      // symbolic alias (both valid)
    ```

    Optional values match as `some(v)` (has value) or `null` (absent):
    ```mine
    match x {
        some(v) => { v * 2 }
        null    => { 0 }
    }
    ```

    ---

- ## Error Handling

    - ### Defining errors

        ```mine
        err MathErrors = [DivisionByZero, Overflow, Underflow]
        err FileErrors = [NotFound, PermissionDenied, DiskFull]

        // merging (sets and variants can be mixed, the result is a flat union of all variants)
        err AppErrors = [MathErrors, FileErrors, Unknown]
        // expands to: [DivisionByZero, Overflow, Underflow, NotFound, PermissionDenied, DiskFull, Unknown]
        ```

    - ### Error-returning functions

        ```mine
        fn divide(a: f32, b: f32) MathErrors!f32 {
            if b == 0.0 { fail DivisionByZero }
            return a / b
        }

        // inline error set
        fn divide(a: f32, b: f32) [DivisionByZero, Overflow]!f32 {..}

        // inline merge
        fn process() [MathErrors, FileErrors]!void {..}
        ```

    - ### Handling

        ```mine
        // propagate
        let result = try divide(a, b)

        // inline catch
        let result = divide(a, b) catch e { 0.0 as f32 }

        // match
        match divide(a, b) {
            ok(v)           => { v }           // ok is a built-in pattern for the success value
            .DivisionByZero => { 0.0 as f32 }  // error variants use dot syntax
            else            => { 0.0 as f32 }
        }
        ```

        ---

- ## Deferred Statements

    ```mine
    fn process() FileErrors!void {
        let file = try open(path)
        defer file.close()       // always runs on scope exit
        errdefer log("failed")   // runs only if the function exits with an error (via fail or a propagated try)

        try write(file, data)
    }

    // multiple defers run in reverse order (LIFO):
    fn example() void {
        defer @printn("third")
        defer @printn("second")
        defer @printn("first")
    }
    // prints: first, second, third
    ```

    ---

- ## Control Flow

    All of these are expressions (produce a value when used in expression context):

    ```mine
    // if/else
    let label = if score > 100 { "high" } else { "low" }

    // ternary
    let x = cond ? 1 as i32 : 2 as i32

    // match
    match direction {
        .North => { "up"   }
        .South => { "down" }
        else   => { "other" }
    }

    // ranges in match
    match score {
        0..50    => { "fail"      } // 0 to 49
        50..90   => { "pass"      } // 50 to 89
        90..=100 => { "excellent" } // 90 to 100
        else     => { "invalid"   }
    }

    // try/catch
    let result = try divide(a, b)
    let result = divide(a, b) catch e { 0.0 as f32 }

    // orelse
    let y = x ?? 0 as i32
    let y = x orelse 0 as i32

    // logical operators (both forms valid)
    if x > 0 && x < 10 {..}
    if x > 0 and x < 10 {..}

    if a == null || b == null {..}
    if a == null or b == null {..}

    if !cond {..}    // symbolic
    if not cond {..} // keyword alias for ! (both are reserved)

    // operator keyword aliases (all are reserved keywords)
    // !  = not
    // && = and
    // || = or
    // ?? = orelse  (both valid, orelse preferred in Mine style)

    // comptime
    comptime if PLATFORM == .windows {..}
    comptime match ARCH {
        .x86_64 => {..}
        .arm64  => {..}
    }

    // comptime for (metaprogramming over type fields)
    // ⚠️  depends on @typeInfo, which is not yet designed (see TODO)
    // comptime for field in @typeInfo(T).fields {
    //     @printn(field.name)
    // }
    ```

    ---

- ## Exit Statements

    Not expressions. Change the execution path:

    ```mine
    return value        // exit function
    fail ErrorVariant   // exit with error
    break               // exit loop
    break label         // exit labeled loop
    continue            // next iteration
    continue label      // next iteration of labeled loop
    unreachable         // panic in debug, undefined behavior in release (signals the compiler this path is impossible)
    ```

    - ### Labels

        ```mine
        outer: for i in 0..10 {
            for j in 0..10 {
                if j == 5 { break outer }
                if j == 3 { continue outer }
            }
        }

        // labeled block (returns value)
        let x = result: {
            if cond { break result 42 as i32 }
            break result 0 as i32
        }
        ```

    ---

- ## Loops

    ```mine
    // infinite
    loop { if done { break } }

    // with continue expression (runs after each iteration, like a for-loop's increment)
    loop : (i += 1) { if i >= 10 { break } }

    // while
    while i < 10 { i += 1 }
    while i < 10 : (i += 1) { if i == 5 { continue } }

    // for
    for v in arr {..}
    for v, i in arr {..}
    for _, i in arr {..}

    // ranges
    for i in 0..10  {..} // 0 to 9 (exclusive)
    for i in 0..=10 {..} // 0 to 10 (inclusive)
    for i in 10..=0 {..} // 10 to 0 (descending, step inferred from direction)
    ```

    - ### Custom iterators

        A class with `pub fn next() ?T` satisfies the iterator protocol:
        ```mine
        for item in MyIterator(data) {..}
        ```

        ---

- ## Arrays, Slices, Pointers

    - ### Arrays

        ```mine
        let arr: [5]u8 = [1, 2, 3, 4, 5] // fixed size, stack allocated
        let arr: [_]u8 = [1, 2, 3]       // size inferred from literal

        arr[0]  // access
        arr.len // length
        ```

    - ### Slices

        ```mine
        let s: []u8     = "hello"   // immutable slice
        let s: []mut u8 = [1, 2, 3] // mutable slice

        s.ptr    // *u8 or *mut u8 (inherits mutability)
        s.len    // length
        s[0]     // access
        s[1..3]  // subslice (exclusive)
        s[1..=3] // subslice (inclusive)
        s[2..]   // open-ended (from index 2 to end)
        ```

    - ### Pointers

        ```mine
        let x = 10 as i32
        mut y = 10 as i32

        let p: *i32     = &x   // immutable pointer
        let p: *mut i32 = &y   // mutable pointer (y must be mut)
        let p: ?*i32    = null // optional pointer

        p.*      // dereference (read)
        p.* = 10 // dereference (write, *mut only)
        ```

    - ### Many-Item Pointers

        A many-item pointer points to an unknown number of elements. Unlike slices, it carries no length:

        ```mine
        let p: [*]i32     = &arr // immutable many-item pointer
        let p: [*]mut i32 = &arr // mutable many-item pointer

        p[0]     // index (no bounds check, length unknown)
        p[0..5]  // slice (produces []i32, requires you know the length)
        p[0..=4] // slice (inclusive)
        ```

        | Type   | Length | Indexable | Sliceable  |
        | ------ | ------ | --------- | ---------- |
        | `*T`   | --      | ✗         | ✗          |
        | `[*]T` | --      | ✓         | ✓ (manual) |
        | `[]T`  | ✓      | ✓         | ✓          |

        > Use slices (`[]T`) whenever possible. Reach for `[*]T` only when interfacing with raw memory or external APIs where length is tracked separately.

        ---

- ## Arithmetic Overflow

    ```mine
    a + b    // default: panics in debug, undefined behavior in release
    ```

    > **Note:** `+` is intentionally unsafeguarded in release (this is a deliberate design decision, not an oversight). The purpose of `+` is raw addition. you are responsible for knowing what you're doing. If you need defined overflow behavior, use one of the explicit operators below explicitly.

    ```mine
    // wrapping (two's complement)
    a +% b
    a -% b
    a *% b

    // saturating (clamps at min/max)
    a +| b
    a -| b
    a *| b

    // checked (returns ?T, null on overflow)
    a +? b
    a -? b
    a *? b
    ```

    | Context       | Behavior                       |
    | ------------- | ------------------------------ |
    | Compile-time  | Error if value doesn't fit     |
    | Debug build   | Panic on overflow              |
    | Release build | Undefined behavior             |
    | `+%`          | Wrapping (always)              |
    | `+\|`         | Saturating (always)            |
    | `+?`          | Returns `?T`, null on overflow |

    ---

- ## Compile-Time (`comptime`)

    ```mine
    comptime let MAX = 1024 as i32
    comptime let T: type = i32 // a type as a comptime value

    comptime fn triple(n: i32) i32 {
        return n * 3
    }

    comptime let TRIPLE_MAX = triple(MAX) // evaluated at compile time

    fn allocate(comptime size: i32) [size]u8 {..}
    ```

    - ### Type introspection

        ```mine
        // sizeof, typeof, maxof, minof, alignof are keyword expressions:
        sizeof i32  // or sizeof(i32)
        typeof x    // or typeof(x)
        maxof i32
        minof i32
        alignof i32
        ```

        ---

- ## Comments

    File-level metadata (top of file, distinct from regular comments):
    ```mine
    # file : math.mine
    # desc : Math utilities
    ```

    Doc comments (document the next declaration):
    ```mine
    /// @param x the input
    /// @return the result
    pub fn process(x: i32) i32 {..}
    ```

    Line comment:
    ```mine
    // line comment
    ```

    ---

- ## Modules

    Each `.mine` file is a module. `pub` declarations are visible to importers, everything else is private to the file.

    ```mine
    let math = @import("./math") // resolves to ./math.mine
    let io   = std.io            // standard library module

    math.add(2, 3)
    ```

    > The full module system (packages, search paths, build integration) will be documented separately once stabilized.

    ---

- ## Builtins

    ```mine
    @print("hello")             // no trailing newline
    @printn("hello")            // with trailing newline
    @printn("{}, {}", x, y)     // positional (each {} consumes one argument in order)
    @printn("{:x}", x)          // hex
    @printn("{:b}", x)          // binary
    @printn("{:.2}", x)         // 2 decimal places
    @printn("{:>10}", x)        // right-align width 10
    // mismatched {} count and arguments is a compile error

    @assert(cond)               // panic if cond is false
    @assertEq(a, b)             // panic if a != b
    ```

    ---

- ## Testing and Benchmarking

    `test` blocks verify correctness. `bench` blocks measure execution time and throughput, the runner reports iterations per second and total elapsed time:

    ```mine
    test "addition works" {
        let result = add(2 as i32, 3 as i32)
        @assertEq(result, 5 as i32)
    }

    bench "print loop" {
        for i in 0..1000 { @print("hello") }
    }
    ```

    ```
    # in your terminal
    > mine test
    > mine bench
    ```

    ---

- ## Discard (`_`)

    `_` is a special placeholder, not a valid variable name or identifier (it cannot be read or bound). Use it to explicitly discard a value:

    ```mine
    _ = expensiveFn()    // discard result
    for _, i in arr {..} // discard value, keep index
    _ = _                // CompilerError (_ cannot be read)
    ```

    ---

- ## Multiple Return Values

    Functions return multiple values via tuples:

    ```mine
    fn minMax(arr: []i32) [i32, i32] {
        mut min = arr[0]
        mut max = arr[0]
        for v in arr {
            if v < min { min = v }
            if v > max { max = v }
        }
        return [min, max]
    }

    let result = minMax(arr)
    result[0] // min
    result[1] // max

    // destructuring syntax is planned (see TODO):
    // let min, max = minMax(arr)
    ```

    > `[T]` is an Array.
    >
    > `[T,]` is a Single-Type Tuple.
    >
    > `[A,B]` is a Multi-Type Tuple.
    >
    > Both supports `.len` and `[index]`.

    ---

- ## TODO

    The following are planned but not yet fully designed. Items marked with ⚠️ affect features already mentioned in this spec:

    - ⚠️ Metaprogramming API (e.g. `@typeInfo`)
    - ⚠️ Destructuring syntax (`let min, max = minMax(arr)`)
    - ⚠️ String formatting full spec (`@print`/`std.fmt` format strings)
    - Standard library API
    - Memory allocator design