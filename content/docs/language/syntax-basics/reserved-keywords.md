---
title: "Reserved Keywords"
icon: edit_off
weight: 101
---

> 📢 _In this version of Mine, most of the keywords reserved in Zig are also reserved in Mine. However, this may change in the future._

---

The following keywords cannot be used as [identifiers](./identifiers):

```
// ...
let mut fn
var const

// ...
interface def impl
struct class enum union errset

// ...
for while loop
in by

// ...
if else match try catch orelse as into

// ...
return fail break continue unreachable
defer errdefer use from test bench asm

// ...
null undefined true false never void bool any anyerror
anytype anyframe anyopaque type mod int comptime_int float comptime_float

// ...
pub prv static inline comptime volatile
allowzero export extern packed opaque threadlocal addrspace
align linksection noalias noinline nosuspend resume suspend

// ...
this Self op callconv
```

---
