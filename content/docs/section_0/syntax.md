---
title: "Syntax Reference"
description: "Complete syntax reference for the Mine programming language."
icon: "code"
weight: 2
date: "2026-05-07"
lastmod: "2026-05-07"
draft: false
toc: true
---

This page documents the complete syntax of the Mine programming language.

## File Structure

Every file ending with `.mine` is a module in Mine. The `#` at the top of the file are comments to save metadata about the module.

```mine
# meta : data
# .... : ....

pub fn main() @println("Hello, World!");
```

## Comments

There are 3 types of comments:

| Symbol | Description | Example |
|--------|------------|----------|
| `#` | File comment to declare module metadata | `# author : John` |
| `///` | Doc comment, written before declarations | `/// This function does X` |
| `//` | Line comment is just a useless comment | `// this is ignored` |

### File Comments

```mine
# meta : data
# author : John Doe
# version : 1.0.0
```

### Doc Comments

```mine
/// Calculates the sum of two numbers
fn add(a: int, b: int) int {}
```

### Line Comments

```mine
var x = 1; // this is a comment
```

## Variables

### Mutable Variables (`var`)

```mine
var name : type = value;
var name = value; // type inferred
var name : type; // undefined by default
```

A variable must be declared with either a type or a value (or both):

```mine
var x : int;       // OK, has type
var x = 1;        // OK, has value
var x;            // ERROR
```

> `;` are optional.

### Constants (`const`)

Just like variable in everything but its value cannot be reassigned.

```mine
const name = 0;
name = 1; // ERROR
```

## Functions

We use keyword `fn` to declare a function.

```mine
fn name(x : type = default_value_optional) type {}
```

> `: type` is named in mine **Type Annotation**

> params with optional values must came lastly.

If a function could return an error we add `!` before the return type.

```mine
fn name() !type {}
```

> errors in mine are values.

```mine
fn one() !type {} // mine will infer the errors returning.
fn two() MyErrorSet!type {} // defining explicit error set (recommended).
fn three() {Error1, Error2}!type {} // instead of a full new error set.
```

Function body in mine is a statement:

```mine
fn proc() type stmt;
```

To define we call all of our statements inside a block. Blocks in mine are actually statements:

```mine
fn proc() type {
    // all statements each in a line.
}
```

## Keywords

- `fn`
- `pub`
- `var`
- `const`
- `for`
- `while`
- `loop`
- `return`
- `break`
- `continue`
- `defer`
- `errdefer`
- `test`
- `bench`

## Expressions

A value would be an expression.

```mine
var name = 1; // literal expression
var name = 1 + 1; // binary expression
// more about expressions soon.
var name = if x {} else {}; // match expression
var name = try {} catch {}; // try/catch expression
```
