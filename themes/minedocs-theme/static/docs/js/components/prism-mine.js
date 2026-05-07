/**
 * Mine Programming Language Prism Grammar
 * Based on mine-syntax-currently.md
 */
Prism.languages.mine = {
    // Single-line and multi-line comments
    comment: {
        pattern: /(?:#[^\n]*|\/\/.*|\/\*[\s\S]*?\*\/)/,
        greedy: true
    },
    
    // File comment (starts with # at beginning of line)
    filecomment: {
        pattern: /^#\s.*/m,
        alias: "comment",
        greedy: true
    },
    
    // Doc comment (///)
    doccomment: {
        pattern: /\/\/\/.*/,
        alias: "comment",
        greedy: true
    },
    
    // Keywords (reserved words)
    keyword: {
        pattern: /\b(fn|pub|var|const|for|while|loop|return|break|continue|defer|errdefer|test|bench|if|else|match|case|try|catch|throw)\b/,
        alias: "keyword"
    },
    
    // Types
    type: {
        pattern: /\b(int|i8|i16|i32|i64|uint|u8|u16|u32|u64|char|string|bool)\b/,
        alias: "type"
    },
    
    // Boolean literals
    boolean: {
        pattern: /\b(true|false)\b/,
        alias: "boolean"
    },
    
    // Numbers (integers)
    number: {
        pattern: /-?\b\d+\b/,
        alias: "number"
    },
    
    // Function name (identifier followed by parenthesis)
    function: {
        pattern: /\b[a-zA-Z_]\w*(?=\s*\()/,
        alias: "function"
    },
    
    // Strings (double-quoted)
    string: {
        pattern: /"(?:[^"\\]|\\.)*"/,
        greedy: true
    },
    
    // Variable/function names
    variable: {
        pattern: /\b[a-zA-Z_]\w*\b/
    },
    
    // Operators
    operator: {
        pattern: /[+\-*/%=!<>?:]+|==|!=|<=|>=|&&|\|\||\.\.\.|\.\./,
        alias: "operator"
    },
    
    // Punctuation
    punctuation: {
        pattern: /[{}[\];(),]/,
        alias: "punctuation"
    }
};