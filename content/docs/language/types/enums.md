---
title: "Enums"
icon: toggle_on
weight: 138
---

Enums are tag-only types with auto-numbering, explicit tag types, methods, declarations, enum merging with `|`, and non-exhaustive variants for C interop.

---

- ## Simple enum

    ```mine
    let Color = enum {
        Red,
        Green,
        Blue,
    }
    ```

    Tags auto-number from 0.

    ---

- ## Enum with explicit tag type

    ```mine
    let HttpStatus = enum(u16) {
        Ok       = 200,
        NotFound = 404,
    }
    ```

    Ordinal values can be overridden. The next unset value continues from the previous:

    ```mine
    let Value = enum(u32) {
        Hundred  = 100,
        Thousand = 1000,
        Million  = 1000000,
        Next,    // → 1000001
    }
    ```

    Use `@intFromEnum` and `@enumFromInt` to convert between an enum and its integer tag:

    ```mine
    let n = @intFromEnum(HttpStatus.Ok)   // 200
    let s = @enumFromInt(HttpStatus, 404) // HttpStatus.NotFound
    ```

    Use `@tagName` to get the string name of a variant at runtime:

    ```mine
    let name = @tagName(HttpStatus.Ok)    // "Ok"
    let name = @tagName(Color.Green)      // "Green"
    ```

    ---

- ## Methods

    Enums can have methods, which act as namespaced functions callable with dot syntax. Since enums have no mutable state, methods are always declared with `fn` (providing an immutable `this` context):

    ```mine
    let Suit = enum {
        Clubs,
        Spades,
        Diamonds,
        Hearts,

        // No need to pass (self: Suit) anymore. the compiler provides an implicit read-only 'this'
        pub fn isClubs() bool {
            this == Suit.Clubs
        }
    }

    Suit.Spades.isClubs() // false
    ```

    ---

- ## Declarations

    Enums can contain `let` declarations. These are namespaced constants, unrelated to enum variant values. Enums cannot contain `mut` declarations (there is no mutable state attached to an enum type itself).

    ```mine
    let Mode = enum {
        let maxRetries: u32 = 3,
        On,
        Off,
    }

    Mode.maxRetries // 3
    ```

    ---

- ## Enum merging

    Enums merge with `|`:

    ```mine
    let ReadPerms  = enum { Read }
    let WritePerms = enum { Write, Append }
    let AllPerms   = ReadPerms | WritePerms  // { Read, Write, Append }
    ```

    When merging enums that have explicit integer tag values, the tag values of all variants across both enums must not overlap (overlapping ordinals are a compile error).

    ---

- ## Non-exhaustive enum

    A non-exhaustive enum must specify an explicit tag type. The `_` placeholder marks it as open (it can hold integer values not listed as named variants):

    ```mine
    let Permission = enum(u8) { Read, Write, Execute, _ }
    ```

    Without the explicit tag type (`enum(u8)`), using `_` is a compile error. When matching a non-exhaustive enum, an `else` arm is required to handle unknown values.

    ---

- ## Switching on enums

    ```mine
    let c = Color.Red

    match c {
        .Red  => "warm",
        else  => "other",
    }
    ```

    Must be exhaustive or have an `else` arm.

    ---