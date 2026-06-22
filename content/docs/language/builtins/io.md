---
title: "I/O Builtins"
icon: build
weight: 200
---

> 🛠 _This part is still under design (I will update this document later)._

---

- ## Printing

    - ### `@printf`

        ```mine
        /// ...
        @printf(comptime fmt: []u8, ...args) void
        ```

        ```mine
        @printf("Welcome Mr.{s}", "Maysara") // -> Welcome Mr.Maysara
        @printf("Welcome Mr.{s}")            // -> ERROR
        ```

        ---

    - ### `@print`

        ```mine
        /// ...
        @print(comptime fmt: []u8, ...args) void
        @print(...args) void
        ```

        ```mine
        @print("Welcome Mr.{s}", "Maysara") // -> Welcome Mr.Maysara
        @print("Welcome Mr.{s}")            // -> Welcome Mr.{s}
        ```

        ---

    - ### `@printn`

        ```mine
        /// ...
        @printn(comptime fmt: []u8, ...args) void
        @printn(...args) void
        ```

        ```mine
        @printn("Welcome Mr.{s}", "Maysara") // -> Welcome Mr.Maysara\n
        @printn("Welcome Mr.{s}")            // -> Welcome Mr.{s}\n
        ```

        ---

- ## File Loading

    - ### `@embedFile`

        ```mine
        /// ...
        @embedFile(comptime path: []u8) *[N:0]u8
        ```

        ```mine
        let data = @embedFile("config.json"); // -> Load content as compile-time array
        let wrong = @embedFile(dynamic_path); // -> ERROR
        ```

        ---
