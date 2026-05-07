---
title: "Variables & Constants"
description: "Learn how to declare and use variables and constants."
icon: "storage"
weight: 3
date: "2026-05-07"
lastmod: "2026-05-07"
draft: false
toc: true
---

In Mine, there are four main ways to store data:

| Declaration | Mutability | When Evaluated | Where Stored |
|------------|------------|----------------|--------------|
| `var` | Mutable | Runtime | Memory (RAM) |
| `comptime var` | Mutable | Compile time | Only during compilation |
| `const` | Immutable | Runtime | Memory (RAM) |
| `comptime const` | Immutable | Compile time | Binary (embedded) |

---

## Variables (`var`)

A runtime variable - stored in memory, can be changed:

```mine
var name : type = value;
var name = value; // type inferred
var name : type; // undefined by default
```

### Type Inference

In Mine, types are optional - the compiler can infer them:

```mine
var name = value; // type is inferred
```

### Must Have Type or Value

A variable must have either a type or a value (or both):

```mine
var x : int;       // OK - has type
var x = 1;        // OK - has value
var x;            // ERROR - has neither
```

> `;` are optional.

---

## Compile-Time Variables (`comptime var`)

A variable that only exists during compilation - can be changed while compiling:

```mine
comptime var counter = 0;
counter = counter + 1; // only during compilation
```

This exists only while the compiler is building your program. It does not exist at runtime.

---

## Constants (`const`)

An immutable runtime value - stored in memory, cannot be reassigned:

```mine
const PI = 3.14;
PI = 3; // ERROR - cannot reassign
```

---

## Compile-Time Constants (`comptime const`)

An immutable compile-time value - embedded directly in the binary:

```mine
comptime const VERSION = "1.0.0";
```

The expression is evaluated during compilation and the result is baked into the binary. Compile-time integers and floats are **literals** - they get inlined and have no address.

---

## Pointers

Pointers require a real value in memory. You cannot point to compile-time literals:

```mine
// Pointer to mutable
var x : int = 10;
var ptr : *int = &x;

// Pointer to constant
const y : bool = true;
const ptr_const : *const bool = &y;

// ERROR: compile-time literal has no address
// const ptr2 = &10;
```

The rule: compile-time int and float are literals, not values. They get inlined and have no memory address.

---

## Summary

| Declaration | Can Change? | When | Where |
|-------------|-------------|------|--------|
| `var x = 10` | Yes | Runtime | Memory |
| `comptime var x = 10` | Yes | Compile time | Only during compilation |
| `const x = 10` | No | Runtime | Memory |
| `comptime const x = 10` | No | Compile time | Binary (inlined) |

---

## Examples

```mine
// Runtime variable
var count = 0;

// Runtime constant
const MAX_SIZE = 100;

// Compile-time constant (embedded in binary)
comptime const PI = 3.14159;

// Pointer to runtime value
var x = 10;
var ptr = &x;
```
