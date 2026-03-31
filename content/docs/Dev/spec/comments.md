---
title: Comments
description: File, documentation, and line comments for code readability and metadata
icon: short_text
weight: 1
---

> Comments do not affect code semantics. They improve readability and maintainability. Doc comments serve as metadata for declarations, enabling the LSP to enhance the user experience.

---

- ## File Comments

    > Must be at the beginning of the file. Key-value pairs separated by colon.

    ```mine
    # file   : main.mine
    # desc   : The entry point of the `minelang.org` website
    #
    # repo   : https://github.com/minelang/minelang.org
    # docs   : https://minelang.org/docs
    #
    # author : https://github.com/maysara-elshewehy
    ```

    > `#` requires key-value pairs separated by colons. Using `#` without a valid pair causes an error.
    >
    > Blank `#` comments are allowed only between file comments.

---

- ## Documentation Comments

    > Must come directly before a declaration. Used by the LSP for hover info.

    ```mine
    /// A function that adds two numbers and returns the result
    ///
    /// @param  <a : i32> - first arg
    /// @param  <b : i32> - second arg
    ///
    /// @return <i64> - result of `a + b`
    pub fn add(a: i32, m: i32) -> i64 {
        return a + b;
    }
    ```

---

- ## Line Comments

    > Everything that follows `//` on the same line is part of it.

    ```mine
    let x = 0 // comment..
    ```