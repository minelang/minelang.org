---
title: "Sections"
icon: grid_view
weight: 104
---

Sections divide code into logical regions using Unicode box characters. Three levels exist with specific nesting rules.

---

- ## Level 1 - major divisions

    ```mine
    ╔════════════════════════════════════ NAME ════════════════════════════════════╗

        let x = 0

    ╚══════════════════════════════════════════════════════════════════════════════╝
    ```

    Must be at module level.

    ---

- ## Level 2 - subdivisions

    ```mine
    ┌──────────────────────────────── NAME ──────────────────────────────────────┐

        let x = 0

    └────────────────────────────────────────────────────────────────────────────┘
    ```

    Every Level 2 must be inside a Level 1.

    ---

- ## Level 3 - smaller regions

    ```mine
    ╭── Name ────────────────────────────────────────────────────────────────────╮

        let x = 0

    ╰────────────────────────────────────────────────────────────────────────────╯
    ```

    Usable anywhere: inside Level 1, Level 2, function bodies, or blocks.

    ---

- ## Nesting rules

    - L1: module level
    - L1 → L2: valid
    - L1 → L3: valid (L2 optional)
    - L1 → L2 → L3: valid
    - Function → L3: valid (anywhere)
    - L2 without L1: invalid

    ---
