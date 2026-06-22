---
title: "Concurrency & Atomics"
icon: sync
weight: 206
---

> 🛠 _This part is still under design (I will update this document later)._

---

- ## Atomic Operations

    - ### `@atomicLoad`

        ```mine
        /// ...
        @atomicLoad<T>(ptr: *T, comptime ordering: std.builtin.AtomicOrder) T
        ```

        ```mine
        let val = @atomicLoad(&shared, .acquire); // -> Reads memory safely across execution threads
        let err = @atomicLoad(shared, .acquire);  // -> ERROR
        ```

        ---

    - ### `@atomicStore`

        ```mine
        /// ...
        @atomicStore<T>(ptr: *T, value: T, comptime ordering: std.builtin.AtomicOrder) void
        ```

        ```mine
        @atomicStore(&shared, 100, .release); // -> Writes values safely across execution threads
        let err = @atomicStore(shared, 100);  // -> ERROR
        ```

        ---

    - ### `@atomicRmw`

        ```mine
        /// ...
        @atomicRmw<T>(ptr: *T, comptime op: std.builtin.AtomicRmwOp, value: T, comptime ordering: std.builtin.AtomicOrder) T
        ```

        ```mine
        let old = @atomicRmw(&counter, .Add, 1, .seq_cst); // -> Performs atomic read-modify-write operation
        let err = @atomicRmw(counter, .Add, 1);            // -> ERROR
        ```

        ---

    - ### `@cmpxchgWeak` / `@cmpxchgStrong`

        ```mine
        /// ...
        @cmpxchgStrong<T>(ptr: *T, expected_value: T, new_value: T, success_order: AtomicOrder, fail_order: AtomicOrder) ?T
        ```

        ```mine
        let res = @cmpxchgStrong(&lock, 0, 1, .seq_cst, .seq_cst); // -> Updates value if matching expected state
        let err = @cmpxchgStrong(lock, 0, 1);                      // -> ERROR
        ```

        ---

- ## Optimization Barriers

    - ### `@fence`

        ```mine
        /// ...
        @fence(comptime ordering: std.builtin.AtomicOrder) void
        ```

        ```mine
        @fence(.seq_cst); // -> Enforces strict memory ordering constraints on CPU execution
        @fence(runtime);  // -> ERROR
        ```

        ---
