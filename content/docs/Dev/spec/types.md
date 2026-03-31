---
title: Types
description: Primitives, pointers, collections, composites, and user-defined types
icon: category
weight: 2
---

> Types define the kind of value a variable can hold and the operations allowed on it.
> Mine uses a strong, static type system with type inference.

---
<br>

- ## Special Types

    ```mine
    void        // no value - inferred when function has no return
    noreturn    // never returns - always explicit
    bool        // true / false
    any         // comptime-inferred - function params only
    ```

---
<br>


- ## Primitives

    - ### Integers

        ```mine
        i8 i16 i32 i64 i128            // signed
        u8 u16 u32 u64 u128            // unsigned
        iN uN                          // arbitrary-width (i1, u7, i24 ..)
        isize usize                    // pointer-sized
        cint                           // comptime integer
        ```

    - ### Floats

        ```mine
        f16 f32 f64 f80 f128
        cflt                            // comptime float
        ```

---
<br>


- ## Type Inference

    ```mine
    let x = 42              // inferred cint
    let y = 3.14            // inferred cflt
    let z: i32 = x          // ✔️ coercion - comptime-known, fits
    let w: u8 = 300         // ❌ 300 doesn't fit u8

    let a: i32 = 10
    let b: i64 = a          // ❌ runtime value - needs explicit cast
    let b: i64 = a as i64   // ✔️
    ```

    > **Rule:** Comptime-known values fitting the target type coerce automatically. All other conversions require explicit `as`.

---
<br>


- ## Special Values

    ```mine
    null        // absence - only where ?T expected
    undefined   // uninitialized - type annotation required
    ```

    ```mine
    let x: ?i32 = null              // ✔️
    let x: [256]u8 = undefined      // ✔️
    let x = null                    // ❌ type unknown
    ```

---
<br>


- ## Pointers

    ```mine
    *T              // immutable pointee
    *mut T          // mutable pointee
    *[N]T           // pointer to array
    [*]T            // many-item pointer (no known length)
    [*:S]T          // sentinel-terminated (e.g. [*:0]u8)
    ```

    ```mine
    let x: i32 = 42
    let p: *i32 = &x        // take address
    let v: i32 = p.*        // dereference

    let mut y: i32 = 0
    let mp: *mut i32 = &y
    mp.* = 10               // write through pointer
    ```

    **Mutability is independent at every level:**
    ```mine
    let     p: *i32         // not rebindable, read-only pointee
    let mut p: *i32         // rebindable, read-only pointee
    let     p: *mut i32     // not rebindable, writable pointee
    let mut p: *mut i32     // rebindable, writable pointee
    ```

---
<br>


- ## Collections

    - ### Arrays
        ```mine
        [N]T            // fixed size, immutable
        [N]mut T        // fixed size, mutable

        let a: [5]i32 = [1, 2, 3, 4, 5]
        ```

    - ### Slices
        ```mine
        []T             // immutable elements
        []mut T         // mutable elements
        [:0]T           // sentinel-terminated

        let s: []i32 = a[1..4]          // exclusive [1,4)
        let s: []i32 = a[1..=3]         // inclusive [1,3]
        let s: []i32 = a[0..]           // from 0 to end
        let s: []i32 = a[..]            // entire
        ```

    - ### Strings
        ```mine
        []u8            // standard string - immutable byte slice
        [*:0]u8         // null-terminated (C interop)

        let msg = "hello"               // []u8
        let cs = @nullTerminate("hello") // [*:0]u8
        ```

        > Indexing `[]u8` is always **bytes**. For Unicode use `std.unicode`.

---
<br>


- ## Composites

    - ### Optional
        ```mine
        ?T                      // T or null

        let a: ?i32 = null
        let b: ?i32 = 42
        let val = b orelse 0    // unwrap or default
        ```

    - ### Tuple
        ```mine
        (T, U)
        (T, U, V)

        let pair: (i32, []u8) = (42, "hello")
        let x = pair.0
        let y = pair.1
        ```

    - ### Union
        ```mine
        T | U           // union of two types
        ```

    - ### Error Sets
        ```mine
        ErrSet!T        // explicit error set with return type
        !T              // inferred error set with return type
        ```

---
<br>


- ## Custom Types

    - ### Struct

        > Fields are private by default. `init` and `deinit` are keywords.

        ```mine
        def Point = struct {
            pub x: f32
            pub y: f32

            init(x: f32, y: f32) -> Self {
                return .{ x, y }
            }

            deinit(self) { }

            pub fn distance(self) -> f32  return @sqrt(self.x * self.x + self.y * self.y);

            pub fn translate(self: *mut Self, dx: f32, dy: f32) {
                self.x += dx
                self.y += dy
            }
        }

        let p = Point { x: 1.0, y: 2.0 }   // calls init
        defer p.deinit()                   // calls deinit when scope ends
        ```

        **With defaults - no init needed:**

        ```mine
        def Config = struct {
            host: []u8 = "localhost"
            port: u16  = 8080
        }

        let cfg = Config {}                // all defaults
        let cfg = Config { port: 9090 }    // override one field
        ```

        **Packed struct:**

        ```mine
        def Flags = packed struct {
            a: u1
            b: u3
            c: u4
        }
        ```

        **Struct embedding:**

        ```mine
        def Animal = struct {
            pub name: []u8
            pub fn speak(self)  @print("...\n");
        }

        def Dog = struct extends Animal {
            pub breed: []u8
            pub fn speak(self)  @print("Woof!\n");  // overrides
        }

        let dog: Dog = .{ name: "Rex", breed: "Labrador" }
        dog.speak()     // → "Woof!"
        dog.name        // → "Rex" - inherited field
        ```

        > Embedded type has no named field - fields and methods are promoted directly.

        **Operator overloading:**

        ```mine
        def Vec2 = struct {
            x: f32
            y: f32

            fn + (self, other: Vec2) -> Vec2  return .{ x: self.x + other.x, y: self.y + other.y };
            fn ==(self, other: Vec2) -> bool  return self.x == other.x and self.y == other.y;
            fn [](self, i: usize)    -> f32   return if i == 0 { self.x } else { self.y };
        }
        ```

        > Supported operators: `+` `-` `*` `/` `==` `!=` `<` `>` `<=` `>=` `[]`

        ---

    - ### Enum

        ```mine
        def Color = enum {
            Red,
            Green,
            Blue,
        }

        let c: Color = Color.Red
        ```

        **Error Set:**
        ```mine
        def Error = error {
            FileNotFound,
            InvalidData,
        }
        ```