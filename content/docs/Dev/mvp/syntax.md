---
title: tscore/syntax
description: Mine MVP (Syntax Stage)
icon: keyboard_keys
weight: 3
---


>  `current-stage`
>
> _from **31/3/2026** to **now**._


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

> As shown in the previous structure, the core currently only contains syntax.
>
> This is obvious: everything built later will need this foundation to function.

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

            // we pass the lexer here so we can reuse it
            // without recreating a new one each time       (Important for Performance)
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
        // In this example, I want to parse the source directly as a literal.
        // The expression includes literals, which include numbers (hex, etc.);
        //
        // I can do it by using `from('rule')`
        // so the AST will start directly from the target node instead of the full program.
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

            > I have built this language many times before.
            >
            > This time I can see the full picture in such a good, organized, and optimized way.

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

        > Well, this is the most exciting part here.
        >
        > For now, I need to test every single case to ensure this syntax is what I really want.
        >
        > And since I don't have any special syntax in mind right now...
        >
        > I will focus on exploring the syntax world itself, not the language, not the compiler, not the lexer or parser.
        >
        > In other words, let's imagine the syntax I'm describing as a way to ensure the machine understands the code I wrote.
        >
        > I want to ensure the machine 100% understands what I understand as a human.
        >
        > The `0x1Apkg` example is great. As a human, I know:

        - **Hex** starts with `0x`.

        - `pkg` is a word, not part of 0x1A.

        > Most languages translate it differently, but I don't care—I have my own rules.
        >
        > The main rule here is: **The machine understands what I mean and confirms it.**

        > So the program will say "yeah, the user did something wrong here."
        >
        > I know this is a basic idea, but the main point is that all of this will happen before any parsing, before any AST generation or node traversal.

        - #### Why Is This Important for Me?

            > I will write `Mine(MVP)` in `TypeScript`.
            >
            > Then I will write `Mine` in `Mine(MVP)`.
            >
            > This might look easy to you, but I've done it many times before.
            >
            > I know if we don't have a solid foundation, we can't bootstrap properly.

            > Maybe we can, but what about technical debt afterward?
            >
            > I'm lucky; this is not my first time. This is a journey.
            >
            > "I WROTE A PROGRAMMING LANGUAGE IN 3 DAYS"
            >
            > And then...
            >
            > "I SPENT 100 years with 1 million people and +100B$ cost to fix it xD"


        > I was going to say something, but I forgot.
        >
        > In the `./src/core/syntax/test/rules/` folder, we have a `help.ts` file.
        >
        > With some clever logic, it enables me to create test files like `./src/core/syntax/test/rules/expr/lit_int.test.ts`:

        ```ts
        import { Node }          from '../../../mod/ast';
        import { grammarTest }   from '../help';

        // Tests
        const cases = {

            // Pass the input
            // Set the expected status to success or failure
            // output: if success == true, output is an AST node (can be any node: program/stmt/expr/...)
            // if not, output is an errors array.
                    input       : '0x1A',
                    success     : true,

                    // Using this approach, I can see how each character is represented in the AST.
                    // This helps me (the language creator) to remember it better.
                    // It's a valuable reference that's hard to forget.
                    output      : Node.intLit({ start: 0, end: 4 }, BigInt('26'), '0x1A', 'hex'),
                },
            ],

            LiteralIntMustFail : [
                {
                    input       : '0x1Apkg',
                    success     : false,
                    // Why is it false?
                    //
                    // - The program knows the user wanted hex. We don't care what the user meant by writing `pkg`.
                    //   We read tokens one by one from start to end. I need to understand the first token
                    //   before understanding the second one.
                    //
                    // - So the program will return an error. In LSP, you will have auto-fix options,
                    //   like `0x1A pkg`, `0x1A`, or removing `pkg`, etc. (not yet decided).

                    // Same approach here:
                    // I can see each error and understand why/when it happens, which is better.
                    // I also remember it this way!
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
        // - to simplify the syntax creation process I mentioned above
        // - and then run all test cases using that syntax
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

        > **Note:** `hmm` is a special package manager, created for me and my projects in my environments, to make my life easier.
        >
        > For now, it's just a wrapper for `bun`, so you can use `bun` directly.

        ---

        <br>
        <br>

- ## Progress

    | Target      | Coverage |
    | ----------- | -------- |
    | Comments    | 0%       |
    | Types       | 0%       |
    | Expressions | 0%       |
    | Statements  | 0%       |