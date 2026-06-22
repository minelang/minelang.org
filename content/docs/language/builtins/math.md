---
title: "Math Builtins"
icon: functions
weight: 203
---

> 🛠 _This part is still under design (I will update this document later)._

---

- ## Overflow Metrics

    - ### `@addWithOverflow`

        ```mine
        /// ...
        @addWithOverflow(a: any, b: any) .{ @peerType(a, b), u1 }
        ```

        ```mine
        let res = @addWithOverflow(x, y); // -> Returns 2-element tuple: .0 is result, .1 is overflow bit
        let err = @addWithOverflow(x, s); // -> ERROR (mismatched structural types)
        ```

        ---

    - ### `@subWithOverflow`

        ```mine
        /// ...
        @subWithOverflow(a: any, b: any) .{ typeof a, u1 }

        ```

        ```mine
        let res = @subWithOverflow(x, y); // -> Returns tuple checking execution boundaries
        let err = @subWithOverflow(x, s); // -> ERROR
        ```

        ---

    - ### `@mulWithOverflow`

        ```mine
        /// ...
        @mulWithOverflow(a: any, b: any) .{ typeof a, u1 }
        ```

        ```mine
        let res = @mulWithOverflow(x, y); // -> Returns tuple checking execution boundaries
        let err = @mulWithOverflow(x, s); // -> ERROR
        ```

        ---

- ## Bit Mechanics

    - ### `@popCount`

        ```mine
        /// ...
        @popCount(value: any) typeof value
        ```

        ```mine
        let bits = @popCount(let_mask); // -> Counts quantity of active high binary bits
        let err = @popCount(12.5);      // -> ERROR
        ```

        ---

    - ### `@clz` / `@ctz`

        ```mine
        /// ...
        @clz(value: any) typeof value
        @ctz(value: any) typeof value
        ```

        ```mine
        let leading = @clz(bit_field); // -> Evaluates leading/trailing zeros inside structure
        let err = @clz(float_val);     // -> ERROR
        ```

        ---

- ## Mathematical Optimization

    - ### `@sqrt`

        ```mine
        /// ...
        @sqrt(value: any) typeof value
        ```

        ```mine
        let root = @sqrt(16.0); // -> High-performance hardware instruction mapping
        let err = @sqrt(-5);    // -> ERROR
        ```

        ---

    - ### `@sin` / `@cos`

        ```mine
        /// ...
        @sin(value: any) typeof value
        @cos(value: any) typeof value
        ```

        ```mine
        let s = @sin(0.5);   // -> High-performance hardware trigonometric sine
        let err = @sin(42);  // -> ERROR
        ```

        ---
