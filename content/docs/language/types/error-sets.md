---
title: "Error Sets"
icon: error
weight: 141
---

Error sets define named error values using `errset { }`.

---

- ## Declaration

    ```mine
    let FileError = errset {
        NotFound,
        PermissionDenied,
        IoFailure,
    }
    ```

    ---

- ## Using error sets

    ```mine
    fn open(path: string) FileError!File { ... }
    ```

    ---

- ## Failing with an error

    ```mine
    fn open(path: string) FileError!File {
        if not_found { fail NotFound }
        // ...
    }
    ```

    ---

- ## `anyerror`

    `anyerror` is the global error set (the superset of all error sets. Any error value coerces to `anyerror`). Its usage should be generally avoided in favor of specific error sets.

    ```mine
    fn loose() anyerror!void { ... }
    ```

    ---

- ## Merging

    ```mine
    let FileError = errset { A, B }
    let NetworkError = errset { C }
    let AllErrors = errset { FileError, NetworkError, D } // A, B, C, D
    ```

    ---

- ## Empty error set

    An empty `errset {}` in a function signature like `[ ]!T` means the function can never fail.

    ---
