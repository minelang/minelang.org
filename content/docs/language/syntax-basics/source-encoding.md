---
title: "Source Encoding"
icon: text_fields
weight: 100
---

Mine source files are encoded in UTF-8. An invalid UTF-8 byte sequence is a compile error. Outside of comments and string literals, Mine source code is restricted to ASCII.

---

- ## Bare code is ASCII-only

    Bare identifiers, keywords, operators, and punctuation are restricted to the printable ASCII range (`U+0020`-`U+007E`) plus the whitespace and line-ending characters below.

    ```mine
    let name = "Maysara"  // ok: bare identifier is ASCII, string content is unrestricted
    let اسم = "Maysara"    // error: bare identifier must be ASCII
    ```

    A quoted identifier `@"..."` lifts the ASCII restriction for a single name. needed for FFI symbols, JSON-style keys, or any name that isn't valid as a bare identifier (contains spaces, starts with a digit, collides with a keyword, etc.):

    ```mine
    let @"اسم" = "Maysara"         // ok: quoted identifier, non-ASCII content allowed
    let @"content-type" = "..."   // ok: contains a character invalid in a bare identifier
    ```

    The content inside `@"..."` is parsed exactly like a string literal: ordinary Unicode is allowed, but the [disallowed characters](#disallowed-characters) below are still banned as raw bytes and must use an escape sequence instead. A quoted identifier is exactly the kind of token a Trojan Source attack would target, so it gets no exception.

    Any disallowed character found outside a comment or string literal is a **compile error**. The compiler never silently strips or rewrites characters on the user's behalf (`mine fmt` may *suggest* a fix, but only ever applies it as an explicit, visible diff the user accepts). Silent deletion can merge or split tokens and change program meaning without the author noticing, which is unacceptable for a formatter.

    ---

- ## Disallowed characters

    These code points are banned as **raw bytes anywhere in the source text, with no exception for comments or string literals**:

    | Range / Name          | Code Points                                               | Reason                                                                            |
    | --------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
    | ASCII control         | U+0000 - U+0008, U+000B - U+000C, U+000E - U+001F, U+007F | Control characters, no source-text use                                            |
    | Unicode line endings  | U+0085, U+2028, U+2029                                    | Use `LF` instead                                                                  |
    | Bidirectional control | U+202A - U+202E, U+2066 - U+2069                          | Can make displayed code differ from compiled code (Trojan Source, CVE-2021-42574) |
    | Zero-width / BOM      | U+200B - U+200D, U+FEFF                                   | Invisible; can hide or split tokens silently                                      |

    There is no legitimate reason for any of these to appear as a literal byte in source: a comment never needs to *render* one, and a string that needs the underlying code point can express it through an escape sequence instead (below). Banning the raw byte everywhere (including a leading BOM, with no positional exception) means a file's visual appearance and its compiled meaning can never diverge. One rule, no exceptions, is simpler to remember than a rule with a special case.

    Editors (notably on Windows) sometimes add a leading BOM automatically. That's a tooling concern, not a language concern: `mine fmt` can detect and strip it as an explicit fix, but the compiler itself never tolerates it.

    ---

- ## Expressing any character inside strings and quoted identifiers

    A string literal or a quoted identifier may contain any Unicode code point (including ones banned as raw bytes above) through an explicit escape sequence:

    ```mine
    let rtl_override  = "\u{202E}"   // ok: escape sequence, not a raw byte
    let zwsp          = "\u{200B}"   // ok
    let emoji         = "🔥"         // ok: ordinary Unicode, not in the banned list
    let @"a\u{200B}b" = 1           // ok inside a quoted identifier too
    ```

    The escape sequence itself (`\`, `u`, `{`, hex digits, `}`) is pure ASCII, so it never violates the ASCII-only rule for code, and it never creates a visual/compiled mismatch (what's on screen is exactly what the compiler sees, byte for byte). This single escape form covers every case where a banned code point is genuinely needed as data; no further mechanism is required.

    ---

- ## Whitespace and line endings

    | Code Point        | Name         | Notes                                                                                |
    | ----------------- | ------------ | ------------------------------------------------------------------------------------ |
    | U+0009            | HT (tab)     | Interchangeable with space as a token separator                                      |
    | U+000A            | LF (newline) | Line terminator                                                                      |
    | U+000D            | CR           | Only allowed immediately before `LF` (`CRLF`)                                        |
    | U+0020            | SP (space)   | Standard whitespace                                                                  |
    | U+00A0 - U+10FFFF | Unicode      | Comments, strings, and quoted identifiers only; excludes the disallowed ranges above |

    A bare `CR` without a following `LF` is a compile error.

    ```mine
    let x = 42      // LF-terminated (preferred)
    let y = 43\r\n  // CRLF (accepted)
    let z = 44\r    // error: bare CR without LF
    ```

    Tabs and spaces are interchangeable as separators, but spaces are the recommended convention; `mine fmt` converts tabs to spaces (a safe, meaning-preserving rewrite, unlike deleting a disallowed character).

    ---