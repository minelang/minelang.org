---
title: "Loops"
description: "Loops in Mine - loop, while, for, and ranges."
icon: "loop"
weight: 7
date: "2026-05-07"
lastmod: "2026-05-07"
draft: false
toc: true
---

Mine provides three loop constructs, each with a clear purpose.

## 1. Loop (Infinite)

Use `loop` for infinite loops that run until you explicitly break:

```mine
loop {
    // runs forever until break
}
```

### With Break

```mine
var count = 0;
loop {
    count = count + 1;
    if count > 10 {
        break;
    }
}
```

### With Continue

```mine
loop {
    var i = i + 1;
    if i < 5 {
        continue;
    }
    @println("Done");
}
```

---

## 2. While (Conditional)

Use `while` for loops with a condition checked each iteration:

```mine
var i = 0;
while i < 10 {
    i = i + 1;
}
```

### Difference from Loop

| Keyword | Purpose | Condition |
|---------|---------|-----------|
| `loop` | Infinite loops | None - use break to exit |
| `while` | Conditional loops | Checked at start of each iteration |

### No `while true`

Using `while true` gives a compile-time error. Use `loop` instead:

```mine
// ERROR - won't compile
while true {
    // ...
}

// CORRECT - use loop
loop {
    // ...
}
```

---

## 3. For (Range/Iteration)

The `for` loop has two forms:

### Repeat N Times

```mine
for 10 {
    @println("Hello");
}
```

### With Range

```mine
// Exclusive range: 0 to 9
for i in 0..10 {
    @println(i);
}

// Inclusive range: 0 to 10
for i in 0..=10 {
    @println(i);
}
```

### Range Types

| Syntax | Type | Example | Values |
|--------|------|---------|--------|
| `..` | Exclusive | `0..5` | 0, 1, 2, 3, 4 |
| `..=` | Inclusive | `0..=5` | 0, 1, 2, 3, 4, 5 |

### Over Collections

```mine
var arr = [1, 2, 3];
for item in arr {
    @println(item);
}
```

### With Index

```mine
var arr = [a, b, c];
for i, val in arr {
    @println(i, val);
}
```

---

## Flexible Syntax

Parentheses and curly braces are optional:

```mine
while i < 10 { ... }
while (i < 10) { ... }

for i in 0..10 @println(i);
for i in 0..10 {
    @println(i);
}
```

---

## Ranges

### Character Ranges

Ranges work with characters:

```mine
for c in 'A'..'Z' {
    @println(c);
}

for c in 'A'..='Z' {
    @println(c);
}
```

### Reverse Ranges

```mine
for i in 10..0 {
    @println(i);
}
```

---

## Summary

| Loop Type | Keyword | Use Case |
|-----------|---------|---------|
| Infinite | `loop` | Run forever until break |
| Conditional | `while` | While condition is true |
| Iteration | `for` | Over range or collection |
