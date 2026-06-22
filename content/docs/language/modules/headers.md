---
title: "Headers"
icon: description
weight: 114
---

Files ending in `.h.mine` (or `.h.m`) are header-only declaration files loaded by the compiler's builtin system. They define signatures without implementations and help LSP tooling.

---

- ## Rules

  - Function declarations must not have bodies
  - `@import` of a `.h.mine` file is an error (they are loaded by the compiler's builtin system)
  - Declarations in `.h.mine` are intrinsically available everywhere, like builtins

  ```mine
  // builtins.h.m
  fn import(comptime path: []u8) mod
  fn print(comptime fmt: []u8, ...args) void
  fn printn(comptime fmt: []u8, ...args) void
  fn print(...args) void
  fn printn(...args) void
  fn assert(cond: bool) void
  fn assertEq(a: any, b: any) void
  ...
  ```

  Header files are an implementation detail of the compiler and tooling, not intended for user code.

  ---
