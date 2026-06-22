---
title: "Operators"
icon: functions
weight: 172
---

Operators cover arithmetic, comparison, logical (and/or/not), bitwise, overflow-control (wrapping/saturating/checked), shifting, array concatenation, and pointer/address operators. All arithmetic, shift, and bitwise operators have compound assignment forms.

---

- ## Arithmetic

    | Op   | Meaning                         |
    | ---- | ------------------------------- |
    | `+`  | addition                        |
    | `-`  | subtraction                     |
    | `*`  | multiplication                  |
    | `/`  | division                        |
    | `%`  | remainder                       |
    | `**` | exponentiation                  |
    | `-a` | unary negation                  |
    | `++` | increment (prefix-only, `void`) |
    | `--` | decrement (prefix-only, `void`) |

    `++i` and `--i` are prefix-only and always `void` (they can only be used as standalone statements, never as expressions). There is no postfix form.

    ---

- ## Comparison

    | Op   | Meaning          |
    | ---- | ---------------- |
    | `==` | equal            |
    | `!=` | not equal        |
    | `<`  | less than        |
    | `<=` | less or equal    |
    | `>`  | greater than     |
    | `>=` | greater or equal |

    ---

- ## Logical

    Mine uses English-word logical operators:

    ```mine
    a and b    // logical AND
    a or b     // logical OR
    not a      // logical NOT
    ```

    C-style symbol aliases are also accepted and behave identically:

    ```mine
    a && b     // logical AND  (alias for `and`)
    a || b     // logical OR   (alias for `or`)
    !a         // logical NOT  (alias for `not`)
    ```

    Both forms are always valid. Neither form is overloadable (see `impl.md`).

    ---

- ## Bitwise

    C-style symbols:

    ```mine
    a & b      // AND
    a | b      // OR
    a ^ b      // XOR
    ~a         // NOT (prefix)
    a << b     // left shift
    a >> b     // right shift
    ```

    ---

- ## Overflow behavior

    | Op                | Behavior                      |
    | ----------------- | ----------------------------- |
    | `+` `-` `*`       | panic in debug, UB in release |
    | `-a`              | unary negate (can overflow)   |
    | `+%` `-%` `*%`    | wrapping (two's complement)   |
    | `-%a`             | wrapping unary negate         |
    | `+\|` `-\|` `*\|` | saturating                    |
    | `<<\|`            | saturating left shift         |
    | `+?` `-?` `*?`    | checked, returns `?T`         |

    ---

- ## Array concatenation

    Compile-time concatenation of arrays whose lengths are both known at compile time uses `+`, the same symbol as addition. The compiler resolves which behavior applies based on the operand types (`+` on two arrays means concatenation, on numbers it means addition):

    ```mine
    let array1 = [1, 2]
    let array2 = [3, 4]
    let together = array1 + array2  // [1, 2, 3, 4]
    ```

    ---

- ## Pointer / address operators

    ```mine
    let x: u32 = 1234
    let ptr = &x   // address-of
    ptr.* == 1234  // dereference
    ```

    ---

- ## Compound assignment

    ```mine
    mut x = 10
    x   += .. // addition           (like `x = x  + ..`)
    x   -= .. // subtraction        (like `x = x  - ..`)
    x   *= .. // multiplication     (like `x = x  * ..`)
    x  **= .. // exponentiation     (like `x = x ** ..`)
    x   /= .. // ..
    x   %= ..
    x   &= ..
    x   |= ..
    x   ^= ..
    x  <<= ..
    x  >>= ..
    x  +%= ..
    x  -%= ..
    x  *%= ..
    x  +|= ..
    x  -|= ..
    x  *|= ..
    x <<|= ..
    ```

    All arithmetic, shift, and bitwise operators have compound assignment forms. Checked operators (`+?`, `-?`, `*?`) do not: they return `?T`, which would change the type of the binding on assignment (that's not a mutation, it's a rebind, so no `+?=` form exists).

    ---