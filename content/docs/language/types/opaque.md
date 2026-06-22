---
title: "opaque"
icon: visibility_off
weight: 139
---

`opaque` declares a type with unknown (but non-zero) size and alignment. Opaque types can't be stored directly (only pointed to). They exist to keep type safety across a pointer to data whose layout isn't known, typically for C interop.

---

- ## Basic syntax

    ```mine
    let Window = opaque {}
    let Button = opaque {}
    ```

    Like `struct`, `enum`, and `union`, `opaque` creates a namespace. but unlike them, it has no fields and can never be instantiated as a value. Only pointers to it (`*Window`, `*mut Window`) can exist.

    ---

- ## Type safety across opaque pointers

    Pointers to different opaque types are distinct and don't coerce to each other, even though neither type has any visible structure:

    ```mine
    extern fn show_window(*Window) void

    let main_window: *Window = ...
    let ok_button: *Button = ...

    show_window(main_window)   // ok
    show_window(ok_button)     // compile error: *Button is not *Window
    ```

    This is the main value of `opaque`. it gives you a distinct, checkable pointer type without exposing or guessing at the pointee's layout.

    ---

- ## Methods

    Opaque types can have methods, just like structs, enums, and unions. Because opaque types have no fields, the implicit `this` receiver carries no useful information. Instead, use an explicit `self: *Self` parameter. this cancels the implicit `this` and gives you a named pointer to work with directly (see [Manual methods](../types/structs#manual-methods-and-pointer-mutability)):

    ```mine
    let Window = opaque {
        // Explicit parameter (self: *Self) cancels the implicit `this`.
        // *Self is read-only (we only pass the pointer along, no field writes needed.)
        pub fn show(self: *Self) void {
            show_window(self)
        }
    }

    extern fn show_window(*Window) void

    let main_window: *Window = ...
    main_window.show() // Automatically desugars to Window.show(main_window)
    ```

    ---

- ## C interop

    `opaque` is most commonly used to wrap a pointer from a C library whose internal struct layout isn't exposed in the header. you only ever receive and pass back a pointer to it, never read its fields directly:

    ```mine
    let FILE = opaque {}

    extern fn fopen(path: *u8, mode: *u8) ?*FILE
    extern fn fclose(file: *FILE) i32
    ```

    ---

- ## `anyopaque`

    `anyopaque` is the type-erased pointer target, equivalent to C's `void*`. Unlike a named `opaque {}` type, `*anyopaque` can be cast to or from any other pointer type, and carries no alignment guarantee beyond 1. so casting a pointer with a higher required alignment to `*anyopaque` and back needs an explicit alignment cast.

    ```mine
    fn genericCallback(ctx: *anyopaque) void { ... }
    ```

    Prefer a named `opaque {}` type over `*anyopaque` whenever the pointee has a single, known identity. it catches mismatched-pointer bugs at compile time that `*anyopaque` can't.

    ---