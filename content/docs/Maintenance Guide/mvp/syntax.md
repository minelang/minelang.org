---
title: MVP Syntax Stage
description: Mine MVP (Syntax Stage)
icon: keyboard_keys
weight: 1
---


>  `current-stage`
>
> _from **28/3/2026** to **now**._


---

- ## Structure

    ```
    tscore
    ┣ src
    ┃  ┣ core
    ┃  ┃ ┗ syntax
    ┃  ┃ ┃ ┣ mod
    ┃  ┃ ┃ ┃ ┣ lexer                            # convert `source` to `tokens`      (moved to `@langpkg/lexer`)
    ┃  ┃ ┃ ┃ ┣ parser                           # convert `tokens` to `AST`         (moved to `@langpkg/parser`)
    ┃  ┃ ┃ ┃ ┣ ast.ts                           # program/stmt/expr/type/.. nodes.
    ┃  ┃ ┃ ┃ ┗ syntax.ts                        # the bridge between (lexer, parser and AST)
    ┃  ┃ ┃ ┃                                    # with early syntax analysis.
    ┃  ┃ ┃ ┃
    ┃  ┃ ┃ ┣ rules
    ┃  ┃ ┃ ┃ ┣ lex.ts                           # lexer rules                       (`lexer`       used here)
    ┃  ┃ ┃ ┃ ┣ stmt.ts                          # statement rules                   (`parser, ast` used here)
    ┃  ┃ ┃ ┃ ┣ expr.ts                          # expression rules                  (`parser, ast` used here)
    ┃  ┃ ┃ ┃ ┗ type.ts                          # type rules                        (`parser, ast` used here)
    ┃  ┃ ┃ ┃
    ┃  ┃ ┃ ┣ test
    ┃  ┃ ┃ ┃ ┣ rules                            # real syntax tests stored here
    ┃  ┃ ┃ ┃ ┃ ┃
    ┃  ┃ ┃ ┃ ┃ ┣ stmt                           # statements tests
    ┃  ┃ ┃ ┃ ┃ ┃ ┗ ..
    ┃  ┃ ┃ ┃ ┃ ┃
    ┃  ┃ ┃ ┃ ┃ ┣ type                           # types tests
    ┃  ┃ ┃ ┃ ┃ ┃ ┗ ..
    ┃  ┃ ┃ ┃ ┃ ┃
    ┃  ┃ ┃ ┃ ┃ ┣ expr                           # expressions tests
    ┃  ┃ ┃ ┃ ┃ ┃ ┣ lit_int.test.ts              # related tests must collected in one seperated file
    ┃  ┃ ┃ ┃ ┃ ┃ ┗ ..
    ┃  ┃ ┃ ┃ ┃ ┃
    ┃  ┃ ┃ ┃ ┃ ┗ help.ts                        # it allows us to run tests directly as
    ┃  ┃ ┃ ┃ ┃                                  # groups of tests(input, status, result(AST or error list))
    ┃  ┃ ┃ ┃ ┃
    ┃  ┃ ┃ ┃ ┣ ast.test.ts                      # AST module tests
    ┃  ┃ ┃ ┃ ┗ index.test.ts                    # `@minelang/tscore` tests(ensure exports)
    ┃  ┃ ┃ ┃
    ┃  ┃ ┃ ┗ index.ts                           # contains `MineSyntax` object ready to use.
    ┃  ┃ ┃
    ┃  ┃ ┗..
    ┃  ┃
    ┃  ┗ index.ts
    ┃
    ┗ ..
    ```

> As we can see in the previous structure. The core only contains syntax so far.
>
> This is obvious. everything that will be built later needs this foundation to function.

---

- ## How does syntax work?

    - #### Create

        ```ts
        // file_a.ts
        import { compile }          from '@langpkg/lexer';
        import { Syntax }           from './src/core/syntax/mod/syntax';
        import { typeRules }        from './src/core/syntax/rules/type';
        import { exprRules }        from './src/core/syntax/rules/expr';
        import { stmtRules }        from './src/core/syntax/rules/stmt';
        import { lexRules }         from './src/core/syntax/rules/lex';

        // [1] Compile the lexer rules      - Only one-time (Important for Performance)
        export const MineLexer  = compile(lexRules);

        // [2] Create the syntax            - Only one-time (Important for Performance)
        export const MineSyntax = Syntax.create({
            // metadata
            name    : 'Mine',
            version : '0.1.0',

            // we pass the lexer here, so we can re-use it
            // without re-create a new one every time       (Important for Performance)
            lexer   : MineLexer,

            // parser rules
            grammar : [
                ...stmtRules,
                ...exprRules,
                ...typeRules,
            ],

            // parser settings
            settings: {
                startRule     : 'Root',
                errorRecovery : { mode: 'resilient', maxErrors: 99 },
                ignored       : [ 'ws' ],
            },
        });
        ```

        > For more information about [`lexer`](https://github.com/langpkg/lexer) and [`parser`](https://github.com/langpkg/parser), please visit their repositories and read their documentation.

        ---

        <br>

    - #### Use

        ```ts
        // file_b.ts
        import { MineSyntax } from 'file_a';

        // source -> basic-tokens -> improved-tokens -> AST
        const result = MineSyntax.parse('source');
        ```

        > Imagine `source` is `0x1Apkg` (`0x1A` is hex format, `pkg` is additional text)

        ```ts
        // MineSyntax starts with `Program` node.
        // in this example I want to parse the source directly as literal
        // the expression includes the literals which includes the numbers(hex)
        //
        // I can do it by using `from('rule')`
        // so the ast will start directly from the target node and not full program.
        const ExprSyntax = MineSyntax.from('Expr')

        // now use it like this
        const result = ExprSyntax.parse('0x1Apkg');
        ```

        > After compiling, source becomes an array of tokens:

        ```ts
        [
            {
                type: '0x1Apkg',
                text: '0x1Apkg'
                span: { start: 0, end: 7}
            }
        ]
        ```

        > In most lexers, the `0x1Apkg` will become `0x1A(hex)` + `pkg(ident)`
        >
        > but in mine it's just `0x1Apkg(invalid hex)`

        - #### NOTES

            > I have done this language many times before, I did it tons of times.
            >
            > This time I can see the full picture in so good/organized/optimized way.

            > In the past, I let the syntax errors come from parser_pkg(so basic), and then in analyzer_pkg
            >
            > But I think I can handle more than 50% of possible errors here in this stage before touching the parser or the analyzer pkgs!

            > This approach is much cleaner and efficient, the parser and analyzer will become so clear (it will assume the input has no syntax error, and the programmer means everything he wrote)

            > However, the syntax, after lex, before parse, will pass the tokens to special phase(pre-process)
            >
            > In this phase, the tokens are fixed and analyzed (the system can understand you, when you type `3.x15` mostly you mean `3.15`, so you will get a syntax error with auto-fix option)
            >
            > This approach is applied in everything, numbers(dec,hex,oct,bin,flt), idents, operators, ...

            > so we have a smart analyzer builtin in the pre-process phase.


            ---

            <br>

- ## How do I test syntax?

    - ##### Code Tests

        > the lexer/parser, tested in their repos.

        > for AST and Syntax class, tested in `./src/core/syntax/test/ast|syntax.test.ts`

    - ##### Mine Tests

        > well.. this is the most excited part here.
        >
        > for now, i need to test every signle case to ensure this syntax is what really i want.
        >
        > and since i dont have any special syntax in my head right now..
        >
        > so i will just try exploring the syntax world, not the language, not the compiler, not lexer or parser.
        >
        > in another words, lets imagine the syntax i'm talking about it is a way to ensure that is the machine understand the code i wrote.
        >
        > i want to ensure that is 100% understand what i'm understanding as a human.
        >
        > the `0x1Apkg` example is great, as a human i know :

        - **Hex** start with `0x`.

        - `pkg` is a word, not part of 0x1A.

        > most language translate it diffrently, i don't care, i have my own rules.
        >
        > The Big Rule here is **Machine understand what I mean and confirms it**.

        > so the program will say "yeah, the user did something worng here"
        >
        > i know this is basic idea, but the idea is all of that will happend before any parse, before any ast generation or walks in nodes.

        - #### Why This is Metter for me ?

            > i will write `Mine(MVP)` in `Typescript`.
            >
            > then i will write `Mine` in `Mine(MVP)`.
            >
            > this maybe looks easy for u, but i did it many times before,
            >
            > and i know if we dont have a solid base we cant bootsrap

            > maybe we can, but what about tech-depts after that?
            >
            > i'm lucky, not my first time, this is a trip,
            >
            > "I WROTE PROGRAMMING LANGUAGE IN 3 DAYS"
            >
            > then
            >
            > "I SPENT 100yrs with 1m ppl with +100B$ cost to fix that xD


        > i was say something, but i forgot, however,
        >
        > in `./src/core/syntax/test/rules/` folder we have `help.ts` file
        >
        > with some magic, it enables me to create test file like `./src/core/syntax/test/rules/expr/lit_int.test.ts` :

        ```ts
        import { Node }          from '../../../mod/ast';
        import { grammarTest }   from '../help';

        // Tests
        const cases = {

            // we pass the input
            // we set the expected status at success
            // output, if success == true is AST node (can be any node(program/stmt/expr/...))
            // if not, so output is errors array.

            LiteralIntMustSucceed : [
                {
                    input       : '0x1A',
                    success     : true,

                    // using this way, i can see how each letter is represented in my AST.
                    // this is a feature for me (the language creator)
                    // it help me a lot to save it in my head (hard to forget).
                    output      : Node.intLit({ start: 0, end: 4 }, BigInt('26'), '0x1A', 'hex'),
                },
            ],

            LiteralIntMustFail : [
                {
                    input       : '0x1Apkg',
                    success     : false,
                    // Why it false?
                    //
                    // - the program know, user want hex,    (we dont care what user want by writing `pkg`, we read one-by-one token from start to end.
                    //                                        i need to understand the first firstly, to understand the second!)
                    //
                    // - so the program will return an error (if in lsp, u will have auto fix options,
                    //                                        like `0x1A pkg` or `0x1A` and remove `pkg` and so on, not decided yet..)

                    // same here,
                    // i can see each error, thinking about it, understanding why/when it happen more better.
                    // and also in same way i will save it in my head!
                    output      : [
                        {
                            code    : 'SYNTAX_ERROR',
                            msg     : 'Invalid hexadecimal literal',
                            span    : { start: 0, end: 7 },
                        }
                    ],
                },
            ],

        };

        // Run tests
        // - a shortcut implemented in `help.ts` file
        // - to short the create syntax process i told u about above.
        // - and then run all cases using that syntax.
        grammarTest('Expr', cases);
        ```

        > And to run tests just run `hmm|bun test`.

        ```bash
        > hmm test ./src/core/syntax/test/rules/expr

        src\core\syntax\test\rules\expr\lit_int.test.ts:
        ✓ LiteralIntMustSucceed > 0x1A
        ✓ LiteralIntMustFail > 0x1Apkg

        2 pass
        0 fail
        ```

        > **Note:** `hmm` is a special package manager, made for me, my projects, my enviroments, to make my life easier.
        >
        > for now its just wrapper for `bun`, so u can use `bun` directly.

        ---

        <br>
        <br>

- ## Progress

    | Type     | Status |
    | -------- | ------ |
    | literals | 1%     |
    | ...      | 0%     |

    | Expression | Status |
    | ---------- | ------ |
    | ...        | 0%     |

    | Statement | Status |
    | --------- | ------ |
    | ...       | 0%     |