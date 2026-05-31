---
title: section
description: Named regions used to organize code into logical groups.
icon: view_day
weight: 152
---

> Sections are named regions for organizing related code into logical groups.
> They have no effect on program execution, they exist solely for code organization and are handled automatically by Mine.

---

- ### Levels

    > Mine provides three section levels, allowing large files to be organized hierarchically.

    - #### Level 1

        > Used for major file divisions.

        ```text
        ╔════════════════════════════════════════ NAME ════════════════════════════════════════╗

            content here

        ╚══════════════════════════════════════════════════════════════════════════════════════╝
        ```
        ---

    - #### Level 2

        > Used for subdivisions within a level 1 section.

        ```text
        ┌──────────────────────────────── NAME ──────────────────────────────┐

            content here

        └────────────────────────────────────────────────────────────────────┘
        ```
        ---

    - #### Level 3

        > Used for smaller logical regions.

        ```text
        ╭── Name ──────────────────────────────────────────────────╮

            content here

        ╰──────────────────────────────────────────────────────────╯
        ```

    ---

- ### Getting Started

    > Sections are created effortlessly via LSP snippets:
    >
    > 1. Type `section` in your editor
    > 2. LSP shows available levels
    > 3. Select the level you want
    > 4. Type the section name (auto-selected placeholder)
    > 5. Press `Tab` to move inside
    > 6. Start writing your code
    >
    > **All formatting is handled automatically:**
    > - Widths calculated and maintained
    > - Spacing and indentation applied
    > - Close markers generated
    > - All rules enforced
    >
    > You organize and Mine formats.

    ---

- ### Rules

    - #### Naming

        - L1 and L2 names must be UPPERCASE
        - Common L1 names: `PACK`, `CONST`, `TYPE`, `CORE`
        - Common L2 names: `INIT`, `MAIN`, `HELP`
        - L3 names can be any case (free form)

    - #### Nesting Rules

        - **L2 must be in L1**: Every L2 subsection must be contained within an L1 section
        - **L3 is free**: L3 sections can be used anywhere (in L2, in functions, in code blocks, etc.)
        - Valid: L1 → L2 → L3
        - Valid: L1 → L2 (without L3)
        - Valid: L1 → L3 (skip L2)
        - Valid: Function → L3 (anywhere in code)
        - Invalid: L2 outside L1 (standalone L2)
