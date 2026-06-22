---
title: "fn"
icon: function
weight: 124
---

`fn` declares a function. The last expression in the body is the implicit return value. Supports qualifiers, generics, variadics, overloading, and comptime parameters.

---

- ## Basic syntax

    ```mine
    fn add(a: i32, b: i32) i32 {
        a + b
    }
    ```

    The trailing expression `a + b` is the return value (no `return` needed).

    ---

- ## Void return

    ```mine
    fn log(msg: []u8) void { }
    ```

    ---

- ## Early return

    ```mine
    fn divide(a: i32, b: i32) i32 {
        if b == 0 { return 0 }
        a / b
    }
    ```

    ---

- ## Return type inference

    ```mine
    fn double(x: i32) { x * 2 } // inferred: i32
    ```

    ---

- ## Qualifier order

    Fixed: `pub` → `inline` → `comptime` → `fn`

    ```mine
    pub fn visible() void { }
    pub inline fn fast() void { }
    comptime fn evaluate() void { }
    pub comptime fn schema() void { }
    ```

    ---

- ## Parameters

    ```mine
    fn f(x: i32) void { }            // immutable
    fn f(mut x: i32) void { }        // error: parameters are always immutable
    fn f(comptime x: i32) void { }   // comptime-known
    fn f(...args) void { }           // variadic (heterogeneous tuple)
    fn f(...args: i32) void { }      // typed variadic (each arg must be i32)
    fn f(args: []i32) void { }       // slice parameter
    ```

    - Parameters are immutable by default (`mut` is not allowed). 
    - Variadic parameters (`...`) collect all remaining arguments: untyped as a heterogeneous tuple, typed as a homogeneous sequence where every argument must match.

    For C ABI extern functions, use bare `...` with no name:

    ```mine
    extern fn printf(fmt: *u8, ...) i32
    ```

    ---

- ## Generic functions

    ```mine
    fn first<T>(arr: []T) T { arr[0] }
    fn identity<T>(x: T) T { x }
    ```

    ---

- ## Overloading

    Multiple signatures can share a name. Overload resolution is **first-match**: the compiler tries each definition in declaration order and picks the first one that fits.

    ```mine
    fn print(comptime fmt: []u8, ...args)   // A (fmt-string form)
    fn print(...args)                       // B (bare variadic)

    print("..")                             // -> B (single non-comptime arg)
    print(123)                              // -> B
    print(123, "..")                        // -> B (first arg is not a comptime string)
    print("..", 123)                        // -> A (comptime string first, only A fits)
    ```

    Order matters. If B were declared first, `...args` would swallow every call and A would never be reached:

    ```mine
    fn print(...args)                       // -> B (now first)
    fn print(comptime fmt: []u8, ...args)   // -> A (unreachable)

    print("..", 123)                        // -> B (caught here before A is even tried)
    ```

    Put more specific signatures before more general ones.

    ---