---
title: "Arrays"
icon: view_column
weight: 133
---

Arrays are fixed-size sequences `[N]T` with comptime-known length. Support inferred size `[_]T`, indexing, .len, and sentinel termination `[N:0]T`.

---

- ## Fixed-size array

    ```mine
    let arr: [5]u8 = [1, 2, 3, 4, 5]
    ```

    ---

- ## Inferred size

    ```mine
    let arr: [_]u8 = [1, 2, 3]
    ```

    ---

- ## Access

    ```mine
    arr[0]   // first element
    arr.len  // comptime constant
    ```

    ---

- ## Destructuring

    ```mine
    let x, y = [55, 66]
    ```

    Binds each element to a name in order. The number of bindings must match the array length.

    ---

- ## Slicing

    ```mine
    arr[0..3]  // slice of first 3 elements → []u8
    arr[2..]   // slice from index 2 to end
    arr[0..]   // slice of entire array
    ```

    Slicing an array produces a `[]T`. When both bounds are comptime-known, the result is `*[N]T`, which coerces to `[]T`.

    ---

- ## Sentinel-terminated array

    ```mine
    let arr: [5:0]u8 = [1, 2, 3, 4, 5]
    ```

    The sentinel value follows the last element and is part of the type.

    ---