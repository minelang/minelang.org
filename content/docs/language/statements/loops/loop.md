---
title: "loop"
icon: repeat
weight: 160
---

`loop` creates an unconditional infinite loop with optional continue-expression.

---

- ## Basic

    ```mine
    loop {
        if done { break }
    }
    ```

    ---

- ## With continue-expression

    ```mine
    mut i = 0 as i32
    loop : (i += 1) {
        if i >= 10 { break }
        process(i)
    }
    // after loop: i == 10
    ```

    The continue-expression runs at the end of every iteration that does not exit via `break`. `continue` runs the continue-expression and re-enters from the top.

    ---
