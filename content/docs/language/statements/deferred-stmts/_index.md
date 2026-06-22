---
title: "Deferred Statements"
icon: exit_to_app
weight: 156
---

Deferred statements schedule code to run later in the current scope's lifetime rather than at the point they're written. `defer` runs on every scope exit. `errdefer` runs only when that exit is an error path.

---