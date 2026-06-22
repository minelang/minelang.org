---
title: "Introspection Expressions"
icon: visibility
weight: 173
---

Mine provides keyword expressions for compile-time type introspection. These are expressions, not builtin functions (no `@` prefix needed).

---

- ## `sizeof`

    Returns the byte size of a type:

    ```mine
    let sz = sizeof(i32)    // 4
    let sz = sizeof i32     // parens optional
    ```

    ---

- ## `bsizeof`

    Returns the size of a type in bits (useful for packed structs):

    ```mine
    let  sz =  sizeof i30     // 4
    let  sz =  sizeof i32     // 4
    let bsz = bsizeof i32     // 32
    let bsz = bsizeof i30     // 30
    ```

    ---

- ## `typeof`

    Returns the type of an expression:

    ```mine
    let T = typeof x        // ..
    ```

    ---

- ## `alignof`

    Returns the alignment requirement of a type in bytes:

    ```mine
    let a = alignof i64     // 8 (on most platforms)
    ```

    ---

- ## `maxof` / `minof`

    Returns the maximum/minimum value of an integer type:

    ```mine
    let mx = maxof i32      // 2147483647
    let mn = minof i32      // -2147483648
    ```

    ---

- ## Field introspection builtins

    This part is still under design (I will update it later).

    for now, see [`Builtins`](../builtins/meta).

    ---
