---
title: "Keywords"
description: "Reserved keywords in Mine."
icon: "keyboard"
weight: 5
date: "2026-05-07"
lastmod: "2026-05-07"
draft: false
toc: true
---

Reserved keywords in Mine.

## Declaration Keywords

| Keyword | Description |
|---------|-------------|
| `fn` | Function declaration |
| `pub` | Public visibility |
| `var` | Mutable variable (runtime) |
| `comptime var` | Mutable variable (compile-time) |
| `const` | Constant (runtime or compile-time) |
| `comptime` | Compile-time evaluation prefix |
| `*const` | Pointer to constant |
| `*` | Pointer to mutable |

## Control Flow Keywords

| Keyword | Description |
|---------|-------------|
| `for` | For loop |
| `in` | Iteration over range/collection |
| `while` | While loop |
| `loop` | Infinite loop |
| `return` | Return value |
| `break` | Break loop |
| `continue` | Continue to next iteration |

## Special Keywords

| Keyword | Description |
|---------|-------------|
| `defer` | Deferred execution |
| `errdefer` | Deferred on error |
| `test` | Test function |
| `bench` | Benchmark function |

## Compile Time vs Runtime

In Mine, constants can be evaluated at runtime or compile time:

### Runtime Constant

```mine
const PI = 3.14159;
```

Evaluated at runtime. Cannot be reassigned.

### Compile-Time Constant

```mine
const VERSION = "1.0.0";
```

Evaluated during compilation - the result is baked directly into the binary (embedded). This is like a "variable that only lives during compilation" but becomes a constant in the output.

| Declaration | When Evaluated | Where Stored |
|-------------|----------------|--------------|
| `var x = expr` | Runtime | Memory (RAM) |
| `const x = expr` | Either | Memory or Binary |

## Reserved for Future

These keywords are reserved for future use:

- `if` / `else`
- `match`
- `case`
- `try` / `catch` / `throw`

## Pointers

Pointers store memory addresses. They require a real value in memory.

### Pointer Syntax

```mine
*const    // pointer to constant
*         // pointer to mutable
```

### Examples

```mine
// Constant boolean in memory
const x : bool = true;

// Pointer to constant boolean
const xp : *const bool = &x;

// Mutable variable in memory  
var y : int = 42;

// Pointer to mutable integer
var yp : *int = &y;
```

### Key Rules

- Compile-time literals (`comptime int`, `comptime float`) have **no memory address** - you cannot take a pointer to them
- To have a pointer, the value must exist in memory (runtime)

**Important:** Compile-time literals (like `comptime int` or `comptime float`) have no memory address - you cannot take a pointer to them:

```mine
// ERROR - compile-time int has no address
// var ptr = &10;
```
