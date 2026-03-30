---
title: Literals
description: Mine Language Rules - Syntax - Literals
icon: abc
weight: 5
---

---
<br>


- ### Numeric Literals



    ```mine
    42                              // cint
    0xFF                            // cint
    0o77                            // cint
    0b1010                          // cint

    > The default type for all integer numbers is `cint(comptime integer)`.
    ```

    ```mine
    3.14                            // cflt
    1.0e-2                          // cflt

    > The default type for all floating-point numbers, including scientific notation, is `cflt(comptime float)`.
    ```
    ---
    <br>

- ### String Literals

    ```mine
    "hello"                         // []u8
    @nullTerminate("hello")         // [*:0]u8 - no special syntax (e.g. c"hello")
    ```

    ```mine
    \\ line one                     // multiline string
    \\ line two                     // result: "line one\nline two\n"
    ```
    ---
    <br>

- ### Logical Literals

    ```mine
    true                            // bool
    false                           // bool
    ```

    ```mine
    null                            // null_t
    undefined                       // undefined_t
    ```
    ---
    <br>

- ### Array Literal

    ```mine
    [1, 2, 3]                       // [3]cint
    ```
    ---
    <br>

- ### Tuple Literal

    ```mine
    (1, true)                       // (cint, bool)
    ```
    ---
    <br>

- ### Struct Literal

    ```mine
    .{ x: i32, y: i32 }             // struct { x: i32,      y: i32      }
    .{ x = 0,  y: 0   }             // struct { x: cint = 0, y: cint = 0 }
    ```

    ```mine
    def Point = .{ a: bool, b: null   }

    let _ : Point = .{ x=0,    y=0    } // ERROR : x and y not exists in `Point` struct
    let _         = .{ x=0,    y=0    } // OK    : struct { x: cint = 0, y: cint = 0 }

    let _ : Point = .{ a:i32,  b:i32  } // ERROR : you can't re-set the types
    let _ :       = .{ a:i32,  b:i32  } // OK    : struct { a: i32, b: i32 }

    let _ : Point = .{ a=true, b=null } // OK    : fields names and values types is matched

    ```

    - #### Shorthand

        ```mine
        Point { x: 1, y: 2 }        // calls init if defined and return `Point` structure
        ```

        ```mine
        // [TODO]
        let x: i32, y: i32 = 0, 1;

        let obj = .{ x, y }         // struct { x: i32 = x, y: i32 = y }
        ```