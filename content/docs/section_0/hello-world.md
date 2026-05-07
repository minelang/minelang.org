---
title: "Hello World"
description: "Your first Mine program."
icon: "rocket_launch"
weight: 1
date: "2026-05-07"
lastmod: "2026-05-07"
draft: false
toc: true
---

Welcome to Mine! Let's write your first program.

## Quick Start

```mine
# meta : data
# author : You
# version : 1.0.0

pub fn main() @println("Hello, World!");
```

Output:

```
Hello, World!
```

## File Structure

Every `.mine` file is a module. The `#` at the top declares metadata:

```mine
# meta : data
# author : Your Name
# version : 1.0.0
```

The `pub fn main()` is your entry point - it's the function that runs when you execute your program.

## Breaking It Down

| Part | Description |
|------|-------------|
| `# meta : data` | File comment (metadata) |
| `pub` | Public - can be called from outside |
| `fn main()` | Function named "main" |
| `@println(...)` | Built-in function to print |
