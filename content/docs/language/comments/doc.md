---
title: Doc Comment
description: A comment that documents the item immediately below it.
icon: comment
weight: 112
---

> Starts with `///` and attaches to the next declaration. Used to describe functions, types, constants, and other named items.

---

- ### Syntax

    ```mine
    /// comment
    ```

    ---

- ### Examples

    ```mine
    /// Adds two floating-point numbers and returns their sum
    ///
    /// @param <x>  the first number to add
    /// @param <y>  the second number to add
    ///
    /// @error <OverflowError>  the sum exceeds the maximum f32 value
    ///
    /// @return     the sum of x and y
    pub fn sum(x: f32, y: f32) { OverflowError }!f32 {
        // ...
    }
    ```

    ```mine
    /// The current counter value for active users
    var user_count = 0
    ```

    ```mine
    /// A user identifier type that represents a unique user in the system
    const UID = i32
    ```

    ---

- ### Available Tags

    | Tag           | Description                                                  |
    | ------------- | ------------------------------------------------------------ |
    | `@param`      | Describes a function parameter.                              |
    | `@return`     | Describes the returned value.                                |
    | `@error`      | Documents an error that may be returned or thrown.           |
    | `@note`       | Provides additional information.                             |
    | `@warning`    | Highlights important warnings or caveats.                    |
    | `@example`    | Provides usage examples.                                     |
    | `@see`        | References related declarations or documentation.            |
    | `@deprecated` | Marks a declaration as deprecated and suggests alternatives. |
    | `@author`     | Specifies the author of the declaration.                     |
