---
title: Hello World
description: Write your first program using the Mine programming language.
icon: code
weight: 4
---

Write a simple program that prints to the stderr using **Mine's** built-in functions.

---

- ### Steps

  1. Create a file called `main.mine` with the following code:

      ```mine
      fn main() {
          @printn("Hello World!")
      }
      ```

  2. Use `mine run main.mine` command to build and run it.

      ```bash
      # Output
      Hello World!
      ```

---

_This page will be updated as the language evolves._