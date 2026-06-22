---
title: "CLI"
icon: terminal
weight: 1000
---

> 🛠 _This part is still under design (I will update this document later)._

The `mine` command provides the primary interface for compiling, testing, and formatting Mine projects.

---

- ## Commands

  - ### `mine build`

    Compiles the project in the current directory or at the specified path.

    ```sh
    mine build
    mine build path
    ```

    Reads `.mine/config` for project configuration and outputs compiled binaries or libraries.

    ---

  - ### `mine test`

    Runs all `test` blocks in the project's Mine source files.

    ```sh
    mine test
    mine test path
    mine test path --filter "math-test"
    ```

    - Discovers all `test "..." { }` blocks
    - Reports pass/fail per test block
    - `--filter` runs only tests matching the given substring

    ---

  - ### `mine bench`

    Runs all `bench` blocks and reports timing information.

    ```sh
    mine bench
    mine bench path
    mine bench path --filter "math-bench"
    ```

    - Reports iterations per second and total elapsed time
    - Useful for performance regression detection

    ---

  - ### `mine fmt`

    Formats Mine source files according to the standard style.

    ```sh
    mine fmt
    mine fmt --check # dry run, reports unformatted files
    ```

    - Indentation, spacing, section formatting

    ---

  - ### `todo...`

    > ...

    ---

- ## Exit codes

    | Code | Meaning                                |
    | ---- | -------------------------------------- |
    | 0    | Success                                |
    | 1    | Compilation error                      |
    | 2    | Test failure                           |
    | 3    | Formatting diff found (with `--check`) |

    ---
