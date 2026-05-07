
Every file ending with `.mine` is a `module` in mine programming langauge.

What is `#` at the top of the file are comments to save metadata about the module.

In `main.mine`:
```mine
# meta : data
# .... : ....

pub fn main() @println("Hello, World!");
```

## Comments
 There are 3 types of comments:
- `#` : A file comment to declare the metadata of a module.
- `///` : A Doc comment to declare the documentation. and they're written before declaration.
- `//` : A line comment is just a useless comment.

## Declarations

- `var` to make a mutable variable:
```mine
var name : type = value;
```

In mine types are optional:

```mine
var name = value; // it will infer the type by itself.
```

Also values are optional:
```mine
var name : type; // undefined by default
```

A `value` would be an expression.
```mine
var name = 1; // literal expression
var name = 1 + 1; // binary expression
// more about expressions soon.
var name = if x {} else {}; // match expression
var name = try {} catch {}; // try/catch expression
```

A variable must be declared with either a type or a value or both. but it is not allowed to:
```mine
var name; // error
```

> `;` are optional.

- `const`
Just like variable in everything but its value cannot be reassigned.

```mine
const name = 0;
name = 1; // error
```

## Functions

we use keyword `fn` to declare a function.

```mine
fn name(x : type = default_value_optional) type {}
```

> `: type` is named in mine **Type Annotation**

> params with optional values must came lastly.

if a function could return an error we add `!` before the return type.
```mine
fn name() !type {}
```

> errors in mine are values.

```mine
fn one() !type {} // mine will infer the errors returning.
fn two() MyErrorSet!type {} // defining explicit error set (recommended).
fn three() {Error1, Error2}!type {} // instead of a full new error set.
```

function body in mine is a statement:
```mine
fn proc() type stmt;
```

to define we call all of our statements inside a block.
blocks in mine are actually statements:
```mine
fn proc() type {
  // all statements each in a line.
}
```

## Keywords
- fn
- pub
- var
- const
- for
- while
- loop
- return
- break
- continue
- defer
- errdefer
- test
- bench

## Types
- int
- i8
- i16
- i32
- i64
- uint
- u8
- u16
- u32
- u64
- char
- string
- bool

