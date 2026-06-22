---
title: "Build System"
icon: settings
weight: 1002
---

> 🛠 _This part is still under design (I will update this document later)._

---

- ## `.mine/config`

    Mine projects are configured by a `.mine/config` file at the project root.

    ```json
    {
        "name"                    : "@org/name",
        "desc"                    : "A dummy project",
        "version"                 : "0.0.1",
        "repo"                    : "link",
        "author"                  : "Name <email> <link>",
        "license"                 : "MIT", // or path/link

        "type"                    : "exe", // or lib/pkg
        "main"                    : "src/main.m",
        "output"                  : "dist",

        "build"                   : {
            "target"              : "native", // or [todo...]
            "optimize"            : "debug"   // or fast/small/safe
        },

        "lint"                    : {
            "unused-let"          : "warn",
            "unused-param"        : "warn",
            "unused-function"     : "off",
            // todo...
        },

        "deps"                    : {
            // todo...
        }
    }
    ```

    ---

- ## `todo...`

    > ...

    ---
