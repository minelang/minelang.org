---
title: Functions
description: Mine Language Rules - Syntax - Functions
icon: abc
weight: 7
---

---
<br>


```mine
fn add(a: i32, b: i32) -> i32 {
    return a + b
}

pub fn greet(name: []u8 = "world") {
    @print("hello, {}\n", name)
}

pub inline fn square(x: i32) -> i32 { return x * x }

extern "c" fn malloc(size: usize) -> *mut void
export fn add_for_c(a: i32, b: i32) -> i32 { return a + b }
```

**Rules:**
- Return type is inferred when omitted - `void` if no return, otherwise from `return` expressions.
- All `return` paths must produce the same type. Tuples are idiomatic for multiple return values.
- Default parameters must be at the end of the parameter list.
- **Overloading is supported.** Compiler selects by argument types and count. Ambiguous calls are a compile error.
- **Closures are not supported.** Functions receive everything as parameters.
- **Variadic functions are not supported.** Use slices instead.
- `noreturn` is always written explicitly - never inferred.

- ### Overloading

    ```mine
    fn area(r: f32) -> f32 { return std.math.pi * r * r }
    fn area(w: f32, h: f32) -> f32 { return w * h }

    let a1 = area(5.0)        // → first fn
    let a2 = area(3.0, 4.0)   // → second fn

    // ambiguous - compile error
    fn foo(x: i32) { }
    fn foo(x: i64) { }
    foo(42)           // ❌ 42 is cint, fits both
    foo(42 as i32)    // ✅
    ```

- ### Pipe Operator

    ```mine
    let result = x |> increment |> double |> toString
    // equivalent to: toString(double(increment(x)))
    ```
