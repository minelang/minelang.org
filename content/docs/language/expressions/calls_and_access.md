---
title: "Calls & Access"
icon: call
weight: 175
---

Function calls, method calls, member access, optional chaining, indexing, slicing, and pointer dereference are all call-like expressions.

---

- ## Function calls

    ```mine
    foo()
    foo(a, b)
    obj.method(a, b)
    obj?.method(a)
    ```

    ---

- ## Member access

    ```mine
    obj.field
    obj?.field       // short-circuits on null
    ```

---

- ## Indexing

    ```mine
    arr[0]
    arr[a..b]        // slice
    arr[a..=b]       // inclusive slice
    arr[2..]         // open-ended
    ```

---

- ## Pointer dereference

    ```mine
    ptr.*
    ```

    ---
