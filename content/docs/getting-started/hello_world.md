---
title: Hello World
description: Write your first program using the Mine programming language.
icon: code
weight: 4
---

**Mine** is still under development, but this is a simple first program you can try with the current toolchain.

It is meant to show the language in a small, usable form while the compiler and runtime continue to improve.

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