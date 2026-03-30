---
title: Comments
description: Mine Language Rules - Syntax - Comments
icon: abc
weight: 3
---

> Comments do not affect the code itself.
>
> They are used to make code and files more readable.
>
> Some types of comments are used as metadata for files and definitions (This helps the LSP improve the user experience).

---
<br>

- ## File Comments

    > It must be at the beginning of the files and must be divided into key-value pairs separated by colon.

    ```mine
    # file  : dummy.mine
    # desc  : A dummy file
    # repo  : https://github.com/org/repo
    # docs  : https://example.com/docs
    # owner : https://github.com/maysara-elshewehy
    ```
    ---
    <br>

- ## Documentation Comments

    > It must come before a declaration, e.g. function, variable, or anything else.

    ```mine
    /// A dummy function
    ///
    /// @param  <arg1 : f32> - A dummy arg
    /// @param  <arg2 : i32> - A dummy arg
    ///
    /// @return <bool> - A dummy return
    pub fn dummy(arg1: f32, arg2: i32) -> bool
    ```

    ```mine
    /// A dummy variable
    let mut x = 500
    ```

    ```mine
    /// A dummy constant
    let x = 500
    ```

    ```mine
    /// A dummy type
    def MyIntType = i32
    ```

    ---
    <br>

- ## Line Comments

    ```mine
    let x = 0 // A dummy comment
    ```

    ```mine
    // A dummy comment
    ```

    ```mine
    // A
    // dummy
    // comment
    ```
