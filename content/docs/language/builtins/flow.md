---
title: "Control Flow & Diagnostics"
icon: alt_route
weight: 205
---

> 🛠 _This part is still under design (I will update this document later)._

---

- ## Runtime Failure

    - ### `@panic`

        ```mine
        /// ...
        @panic(msg: []u8) never
        ```

        ```mine
        @panic("Execution state invalid"); // -> Terminates program instantly with trace
        @panic(42);                        // -> ERROR
        ```

        ---

- ## Debugging Hooks

    - ### `@breakpoint`

        ```mine
        /// ...
        @breakpoint() void
        ```

        ```mine
        @breakpoint(); // -> Drops execution straight into an attached debugger
        // Note: No arguments are allowed for this built-in call.
        ```

        ---

- ## Frame Inspection

    - ### `@returnAddress`

        ```mine
        /// ...
        @returnAddress() usize
        ```

        ```mine
        let addr = @returnAddress(); // -> Gets call-stack pointer instruction address
        // Note: Used heavily for implementing low-level manual crash loggers.
        ```

        ---

    - ### `@frameAddress`

        ```mine
        /// ...
        @frameAddress() usize
        ```

        ```mine
        let frame = @frameAddress(); // -> Gets stack pointer address of active block
        // Note: Vital for tracing nested execution depths inside routines.
        ```

        ---
