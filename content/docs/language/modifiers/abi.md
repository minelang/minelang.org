---
title: "ABI Modifiers"
icon: link
weight: 191
---

`extern` declares C-compatible ABI, `export` makes symbols linker-visible, `callconv` sets the calling convention explicitly.

---

- ## extern

    Declares a symbol with C-compatible ABI, for linking against C libraries.

    ```mine
    extern fn puts(s: *u8) i32
    extern fn malloc(size: i64) *void
    ```

    Extern functions have no body (the implementation is provided by the linker).

    ---

- ## export

    Exports a symbol with C-compatible ABI and linker visibility.

    ```mine
    export fn run() i32 { 0 }
    ```

    The function is callable from C code after linking.

    ---

- ## callconv

    Explicitly sets the calling convention.

    ```mine
    callconv(.C) fn c_fn() void { }
    ```

    ---

- ## linksection

    Places a symbol in a specific linker section.

    ```mine
    linksection(".my_section") fn specialized() void { }
    ```

    Controls where the symbol appears in the compiled object file. Useful for interrupt handlers, initialization code, or placing data in specific memory regions (RAM, flash, etc.).

    ---

- ## addrspace

    Sets the pointer's address space, primarily for GPU/compute targets.

    ```mine
    let p: *addrspace(.global) u32 = @ptrFromInt(0x1000)
    ```

    Common address spaces depend on the target: `.global`, `.local`, `.constant`, `.private` on GPU backends. On CPU targets the default `.generic` address space is used.

    ---
