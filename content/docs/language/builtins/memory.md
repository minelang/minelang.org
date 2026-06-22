---
title: "Memory Builtins"
icon: memory
weight: 202
---

> 🛠 _This part is still under design (I will update this document later)._

---

- ## Pointer Casting

    - ### `@ptrCast`

        ```mine
        /// ...
        @ptrCast(value: any) any
        ```

        ```mine
        let raw_ptr: *anyopaque = getBuffer();
        let int_ptr: *i32 = @ptrCast(raw_ptr);  // -> Target type inferred automatically
        let err = @ptrCast(42);                 // -> ERROR
        ```

        ---

    - ### `@alignCast`

        ```mine
        /// ...
        @alignCast(value: any) any
        ```

        ```mine
        let aligned_ptr: *align(4) i32 = @alignCast(loose_ptr); // -> Target alignment inferred
        let err = @alignCast(42);                               // -> ERROR
        ```

        ---

    - ### `@ptrFromInt`

        ```mine
        /// ...
        @ptrFromInt(address: usize) any
        ```

        ```mine
        let mmio_ptr: *volatile u32 = @ptrFromInt(0x40001000); // -> Instantiates typed pointer
        let err = @ptrFromInt(ptr);                            // -> ERROR
        ```

        ---

    - ### `@intFromPtr`

        ```mine
        /// ...
        @intFromPtr(value: any) usize
        ```

        ```mine
        let addr = @intFromPtr(ptr); // -> Converts raw address to numeric integer
        let err = @intFromPtr(42);   // -> ERROR
        ```

        ---

- ## Block Operations

    - ### `@memcpy`

        ```mine
        /// ...
        @memcpy(noalias dest: []mut u8, noalias src: []u8) void
        ```

        ```mine
        @memcpy(dest_slice, src_slice); // -> Copies raw memory blocks efficiently
        @memcpy(dest_slice, short_src); // -> ERROR
        ```

        ---

    - ### `@memset`

        ```mine
        /// ...
        @memset(dest: []mut u8, value: u8) void
        ```

        ```mine
        @memset(buffer, 0);       // -> Fills entire memory region with byte value
        @memset(buffer, invalid); // -> ERROR
        ```

        ---

- ## Optimization Hinting

    - ### `@volatileCast`

        ```mine
        /// ...
        @volatileCast(value: any) any
        ```

        ```mine
        let v_ptr: *volatile u32 = @volatileCast(standard_ptr); // -> Disables register caching
        let err = @volatileCast(10);                            // -> ERROR
        ```

        ---
