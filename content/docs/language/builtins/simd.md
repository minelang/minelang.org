---
title: "SIMD Vector Builtins"
icon: grid_view
weight: 204
---

> 🛠 _This part is still under design (I will update this document later)._

---

- ## Initialization

    - ### `@splat`

        ```mine
        /// ...
        @splat(scalar: any) @Vector(N, typeof scalar)
        ```

        ```mine
        let vec: @Vector(4, f32) = @splat(1.5); // -> Shape inferred from target assignment: [1.5, 1.5, 1.5, 1.5]
        let err = @splat(struct_instance);      // -> ERROR
        ```

        ---

- ## Permutation & Rearranging

    - ### `@shuffle`

        ```mine
        /// ...
        @shuffle<T>(a: any, b: any, comptime mask: any) @Vector(M, T)
        ```

        ```mine
        let mixed = @shuffle<i32>(vec_a, vec_b, i32{ 0, 4, 1, 5 }); // -> Interleaves vector lanes via layout mask
        let err = @shuffle<i32>(vec_a, vec_b, runtime_mask);        // -> ERROR
        ```

        ---

    - ### `@select`

        ```mine
        /// ...
        @select<T>(pred: @Vector(N, bool), a: @Vector(N, T), b: @Vector(N, T)) @Vector(N, T)
        ```

        ```mine
        let result = @select<i32>(mask, vec_a, vec_b); // -> Selects items conditional on a boolean mask vector
        let err = @select<i32>(mask, vec_a, scalar);   // -> ERROR
        ```

        ---

- ## Aggregation

    - ### `@reduce`

        ```mine
        /// ...
        @reduce(comptime op: std.builtin.ReduceOp, value: any) ElemType
        ```

        ```mine
        let sum = @reduce(.Add, vec); // -> Collapses all lane values into a single scalar value
        let err = @reduce(.Add, 42);  // -> ERROR
        ```

        ---
