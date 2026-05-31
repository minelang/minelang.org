---
title: File Comment
description: File-level metadata used for organizing and describing source files.
icon: file-text
weight: 111
---

> File comments appear at the very beginning of a file and are used to define file-level metadata.
>
> They are not part of program execution and are intended for tooling and organizational purposes.
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
