---
title: Variables
description: Mine Language Rules - Syntax - Variables
icon: abc
weight: 6
---

---
<br>


```mine
let x: i32 = 42             // immutable
let mut y: i32 = 0          // mutable
pub let VERSION: u32 = 1    // public module-level constant
comptime let SIZE = 1024    // compile-time constant - follows Zig comptime rules
```

**Rules:**
- Type annotation is optional when it can be inferred.
- **Shadowing is forbidden.** Reusing a name from any enclosing or current scope is a compile error.
- **Order is significant.** Use before definition is a compile error, both at file scope and inside functions.
- `comptime let` follows Zig's comptime semantics exactly.
