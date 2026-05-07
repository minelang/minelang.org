---
title: "Functions"
description: "Learn how to declare and use functions."
icon: "functions"
weight: 4
date: "2026-05-07"
lastmod: "2026-05-07"
draft: false
toc: true
---

Functions are reusable blocks of code.

## Declaring Functions

Use keyword `fn` to declare a function:

```mine
fn name(x : type = default_value) return_type {}
```

### Parts

| Part | Description |
|------|-------------|
| `fn` | Keyword to declare function |
| `name` | Function name |
| `x : type` | Parameter with type annotation |
| `= default` | Optional default value |
| `return_type` | What the function returns |

### Type Annotation

`: type` is called **Type Annotation** in Mine.

### Default Values

Parameters with optional values must come last:

```mine
fn greet(name : string = "World") string {
    return "Hello, " + name + "!";
}
```

## Error-Returning Functions

If a function could return an error, add `!` before the return type:

```mine
fn mightFail() !MyError {
    // return error if something fails
}
```

### Error Sets

```mine
// Infer errors automatically
fn one() !type {}

// Define explicit error set (recommended)
fn two() MyErrorSet!type {}

// Inline error set
fn three() {Error1, Error2}!type {}
```

> Errors in Mine are values.

## Function Body

The function body is a statement:

```mine
fn proc() type stmt;
```

Or use a block for multiple statements:

```mine
fn proc() type {
    var x = 1;
    var y = 2;
    return x + y;
}
```

## Examples

### Basic Function

```mine
fn add(a: int, b: int) int {
    return a + b;
}
```

### With Default Value

```mine
fn greet(name : string = "World") string {
    return "Hello, " + name + "!";
}
```

### Public Function

```mine
pub fn main() @println("Hello!");
```

The `pub` keyword makes the function accessible from outside the module.
