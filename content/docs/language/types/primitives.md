---
title: "Primitive Types"
icon: 123
weight: 130
---

Built-in types include signed and unsigned integers (i1-u65535), floats (f16-f128), bool, void, never, module, type, int/float, any/anyerror/anyopaque, and C ABI types.

---

- ## Integers

    | Type         | Size          |
    | ------------ | ------------- |
    | i8, u8       | 8 bits        |
    | i16, u16     | 16 bits       |
    | i32, u32     | 32 bits       |
    | i64, u64     | 64 bits       |
    | isize, usize | pointer-sized |

    Arbitrary-width integers: `i1` through `i65535`, `u1` through `u65535`.

    ---


- ## Floats

  | Type | Size         |
  | ---- | ------------ |
  | f16  | 16-bit IEEE  |
  | f32  | 32-bit IEEE  |
  | f64  | 64-bit IEEE  |
  | f80  | 80-bit IEEE  |
  | f128 | 128-bit IEEE |

  ---

- ## Boolean

    `bool` - `true` or `false`.

    ---

- ## Void

    `void` - no value, used as function return type or as a field type for zero-size types.

    ---

- ## Never

    `never` - a function returning `never` must provably never return (infinite loop, `unreachable`, etc.).

    ---

- ## Module

    `mod` - the module type, returned by `@import`. Only used to access exported symbols via `.`.

    ---

- ## Type

    `type` - the type of types. A binding whose value is `type` is automatically comptime.

    ---

- ## Any

    `any` - opts out of type checking. Comptime-only. Matches any type in a function parameter (see [Generic Functions](../03-bindings/fn.md)).

    `anyerror` - the global error set, a superset of every error set in the program. A function returning `anyerror!T` can return any error. Prefer narrower error sets when possible. `anyerror` prevents the compiler from exhaustively checking error handling.

    `anyopaque` - a type-erased pointer target, equivalent to C's `void *`. Used when a pointer must be passed across an interface without knowing the concrete type. You cannot read or write through `*anyopaque` directly (cast it to a concrete pointer type first).

    ```mine
    fn store(ptr: *anyopaque) void { ... }  // accepts any pointer
    let typed = @ptrCast(*MyStruct, ptr)    // cast before use
    ```

    ---

- ## Int / Float

    `int` — the type of an untyped integer literal. Has arbitrary precision at compile time. Coerces to any integer type that can hold its value.

    `float` — the type of an untyped float literal. Coerces to any float type.

    > `comptime_int` and `comptime_float` are deprecated aliases for `int` and `float`. The formatter will auto-fix them.

    ---

- ## C ABI types

    `c_char`, `c_short`, `c_ushort`, `c_int`, `c_uint`, `c_long`, `c_ulong`, `c_longlong`, `c_ulonglong`, `c_longdouble` - sized to match the C ABI on the current target. Use these when interfacing with C libraries to avoid size mismatches across platforms.

    ---