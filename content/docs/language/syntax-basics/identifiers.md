---
title: "Identifiers"
icon: format_color_text
weight: 102
---

Identifiers start with a letter or underscore, followed by letters, digits, or underscores. Mine has a fixed set of [Reserved Keywords](./reserved-keywords) that cannot be used as identifiers.

---

- ## Regular Identifiers

    Regular identifiers start with a letter or underscore, followed by zero or more letters, digits, or underscores. They cannot be a keyword.

    ```mine
    let x
    let _x
    let my_x123
    ```

    Identifiers are case-sensitive. `Foo` and `foo` are different.

    ---

- ## Escaped Identifiers

    Escaped identifiers (`@"name"`) allow any string content as an identifier, including keywords and Unicode characters. This is useful for FFI with languages that have different identifier rules.

    ```mine
    // escaped (allows keywords as identifiers)
    let @"i32"
    let @"return"

    // escaped (allows Unicode names)
    let @"命名"
    let @"❤️"
    ```

    ---