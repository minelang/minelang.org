---
title: "Comments"
icon: chat
weight: 103
---

Mine supports three comment forms: line comments, doc comments, and metadata comments.

---

- ## Line comment

    ```mine
    // this is a line comment
    let x = 42 // inline comment
    ```

    Line comments begin with `//` and extend to the end of the line.

    ---

- ## Doc comment

    ```mine
    /// Documents the next declaration
    pub fn add(a: i32, b: i32) i32 { a + b }
    ```

    Doc comments (`///`) are associated with the declaration that follows. They can be read by the LSP and documentation generators.

    ---

- ## Metadata comment

    ```mine
    # file : math.mine
    # desc : Math utilities
    ```

    Metadata comments (`# key : value`) are file-level annotations. They are stripped before compilation but the LSP may use them for tooling features.

    ---

There are no block comments (`/* */`), matching the philosophy that nesting problems are avoided by keeping the lexer simple.

---