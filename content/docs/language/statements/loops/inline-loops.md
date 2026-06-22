---
title: "Inline Loops"
icon: fast_forward
weight: 163
---

All three loop forms accept `inline` to force compile-time unrolling when the iterable is comptime-known.

---

- ## Basic usage

    ```mine
    inline for v in [1, 2, 3] {
        process(v) // unrolled: process(1); process(2); process(3)
    }

    inline while i < 3 : (i += 1) {
        process(i)
    }

    inline loop {
        if done { break }
    }
    ```

    The iterable must be comptime-known. Inline loops are useful for generating unrolled code sequences.

    ---
