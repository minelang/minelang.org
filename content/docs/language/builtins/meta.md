---
title: "Metaprogramming Builtins"
icon: build
weight: 201
---

> 🛠 _This part is still under design (I will update this document later)._

_Note: For `typeof` and type coercion, see the [Introspection Expressions](../expressions/introspection) documentation. They are language keywords, not built-ins._

---

- ## Type Reflection

    - ### `@typeInfo`

        ```mine
        /// ...
        @typeInfo(comptime T: type) std.builtin.Type
        ```

        ```mine
        let info = @typeInfo(i32); // -> Tagged union detailing the type structure
        let err = @typeInfo(42);   // -> ERROR
        ```

        ---

    - ### `@peerType`

        ```mine
        /// ...
        @peerType(...args) type
        ```

        ```mine
        let a: u16 = 5;
        let b: u32 = 500;
        let t = @peerType(a, b);     // -> u32
        let t = @peerType(i16, i32); // -> u32
        ```

        ---

- ## Structural Inspection

    - ### `@hasDecl`

        ```mine
        /// ...
        @hasDecl(comptime T: type, comptime name: []u8) bool

        ```

        ```mine
        let exist = @hasDecl(MyStruct, "init"); // -> true
        let err = @hasDecl(42, "init");         // -> ERROR
        ```

        ---

    - ### `@hasField`

        ```mine
        /// ...
        @hasField(comptime T: type, comptime name: []u8) bool
        ```

        ```mine
        let ok = @hasField(User, "id"); // -> true
        let err = @hasField(User, 42);  // -> ERROR
        ```

        ---

    - ### `@field`

        ```mine
        /// ...
        @field(struct_expr, comptime name: []u8) Expr
        ```

        ```mine
        @field(user, "name") = "Maysara"; // -> Accesses field dynamically
        @field(user, "missing");          // -> ERROR
        ```

        ---

- ## Compile Control

    - ### `@compileError`

        ```mine
        /// ...
        @compileError(comptime msg: []u8) never
        ```

        ```mine
        @compileError("Invalid type!"); // -> Halts compiler instantly with message
        @compileError(runtime_msg);     // -> ERROR
        ```

        ---

    - ### `@compileLog`

        ```mine
        /// ...
        @compileLog(...args) void
        ```

        ```mine
        @compileLog("Value is", val); // -> Dumps details to stderr during build
        // Note: Compile will intentionally fail if @compileLog remains in code.
        ```

        ---

    - ### `@setEvalBranchQuota`

        ```mine
        /// ...
        @setEvalBranchQuota(comptime new_quota: u32) void
        ```

        ```mine
        @setEvalBranchQuota(5000);  // -> Increases limit for long comptime loops
        @setEvalBranchQuota(x);     // -> ERROR
        ```

        ---

- ## Enum/Union Helpers

    - ### `@tagName`

        ```mine
        /// ...
        @tagName(value: any) []u8
        ```

        ```mine
        let name = @tagName(HttpStatus.Ok) // -> "Ok"
        ```

        Returns the string name of an enum variant.

        ---

    - ### `@intFromEnum`

        ```mine
        /// ...
        @intFromEnum(value: any) any
        ```

        ```mine
        let n = @intFromEnum(HttpStatus.Ok) // -> 200
        ```

        Converts an enum value to its integer tag value.

        ---

    - ### `@enumFromInt`

        ```mine
        /// ...
        @enumFromInt(comptime T: type, value: any) T
        ```

        ```mine
        let s = @enumFromInt(HttpStatus, 404) // -> HttpStatus.NotFound
        ```

        Converts an integer to an enum value (checked at runtime).

        ---

    - ### `@unionInit`

        ```mine
        /// ...
        @unionInit(comptime T: type, comptime field: []u8, value: any) T
        ```

        ```mine
        let u = @unionInit(Shape, "Circle", { .radius = 5.0 })
        ```

        Initializes a union when the active field name is only known at compile time.

        ---
