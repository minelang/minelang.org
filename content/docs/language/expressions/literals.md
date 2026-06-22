---
title: "Literals"
icon: numbers
weight: 171
---

Literal values include integers (decimal/hex/octal/binary), floats, booleans, strings, characters, arrays, tuples, null, and undefined.

---

- ## Integer literals

    ```mine
    42                  // decimal (int)
    0xFF                // hex
    0o77                // octal
    0b1010              // binary
    ```

    Untyped until pinned:

    ```mine
    let x = 42          // int
    let x: i64 = 42     // i64
    let x = 42 as i32   // i32
    ```

---

- ## Float literals

    ```mine
    3.14                // float
    1e10                // float (scientific-notation)
    let x = 3.14 as f32 // f32
    ```

    ---

- ## Boolean

    ```mine
    true                // bool
    false               // bool
    ```

    ---

- ## String

    ```mine
    "hello"             // []u8
    "escaped\nstring"   // []u8
    ```

    String literals are `[]u8` slices.

    ---

- ## Character

    ```mine
    'A'                 // int
    let c = 'A' as u8   // u8
    ```

    ---

- ## Array literals

    ```mine
    [1, 2, 3]           // [] comptimt_int
    [x]                 // single-element array
    [x,]                // trailing comma
    []                  // empty
    ```

    ---

- ## Tuple literals

    ```mine
    .{1, 2, 3}          // .{ int, int, int }
    .{x}                // single-element tuple
    .{x,}               // trailing comma
    .{}                 // empty
    ```

    ---

- ## Null and undefined

    ```mine
    null                // for optional types
    undefined           // uninitialized value, coerces to any type
    ```

    ---
