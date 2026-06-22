---
title: "Build System"
icon: settings
weight: 1003
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

- ## `build.mine` / `build.m`

    The build file is a user-written build script that runs before the program is compiled.

    The build file can contain data and logic that the compiler executes at build time.  Results are accessible to source code without explicit `@import`.  This enables:

    - Compile-time configuration
    - Resource embedding
    - Code generation
    - Platform detection and conditional compilation
    - ...

    ---

- ## `todo...`

    > ...

    ---
