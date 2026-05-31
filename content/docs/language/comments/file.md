---
title: File Comment
description: A structured metadata comment at the top of a file.
icon: comment
weight: 111
---

> Starts with `#` and holds key/value pairs separated by `:`. Used to attach metadata like author, version, or description. Must appear before any code.

---

- ### Syntax

    ```mine
    # key : value
    ```

    ---

- ### Examples

    ```mine
    # file  : math.mine
    # desc  : Mathematical utility functions
    # repo  : https://github.com/minelang/stdlib
    # docs  : https://minelang.org/docs/stdlib/math
    # owner : https://github.com/maysara-elshewehy
    ````

    ```mine
    # file  : math.mine
    # desc  : Mathematical utility functions
    #         covering algebra, calculus,
    #         and numerical utilities
    # repo  : https://github.com/minelang/stdlib
    ```

    ---

- ### Common Fields

    | Field   | Description                                |
    | ------- | ------------------------------------------ |
    | `file`  | The file name or identifier.               |
    | `desc`  | A short description of the file's purpose. |
    | `repo`  | A link to the source repository.           |
    | `docs`  | A link to the related documentation.       |
    | `owner` | The owner or maintainer of the file.       |

    > The fields shown above are common conventions used by Mine tooling. Additional custom fields may be added as needed.
