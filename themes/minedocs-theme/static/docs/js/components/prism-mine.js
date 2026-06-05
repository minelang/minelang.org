!function(Prism) {
  function n(e) {
    return function() {
      return e;
    };
  }

  var keywordsRegex = /\b(?:and|async|await|break|by|this|catch|continue|defer|else|errdefer|error|fn|for|if|in|loop|null|or|orelse|packed|return|class|super|bench|test|try|undefined|unreachable|true|false|null|undefined|let|def|mut|while)\b/;

  var identifier = "\\b(?!" + keywordsRegex.source + ")(?!\\d)\\w+\\b";
  var align = "align\\s*\\((?:[^()]|\\([^()]*\\))*\\)";
  var typePattern = "(?!\\s)(?:!?\\s*(?:" +
    "(?:\\?|\\bpromise->|(?:\\[[^[\\]]*\\]|\\*(?!\\*)|\\*\\*)(?:\\s*<ALIGN>|\\s*const\\b|\\s*volatile\\b|\\s*allowzero\\b)*)" +
    "\\s*)*" +
    "(?:\\bpromise\\b|(?:\\berror\\.)?<ID>(?:\\.<ID>)*(?!\\s+<ID>))" +
    ")+"
    .replace(/<ALIGN>/g, n(align))
    .replace(/<ID>/g, n(identifier));

  var simpleTokens = {
    "builtin-type": {
      pattern: /\b(?:bool|comptime_(?:float|int)|f(?:16|32|64|128)|[iu][0-9]+|size|noreturn|type|void|T)\b/,
      alias: "keyword"
    },
    keyword: keywordsRegex,
    number: /\b(?:0b[01]+|0o[0-7]+|0x[a-fA-F\d]+(?:\.[a-fA-F\d]*)?(?:[pP][+-]?[a-fA-F\d]+)?|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)\b/,
    placeholder: {
      pattern: /\b_\b/,
      alias: "variable"
    },
    "class-name": {
      pattern: RegExp(identifier),
      inside: {}
    },
    operator: /\.[*?]|\.{2,3}|[-=]>|\*\*|\+\+|\|\||(?:<<|>>|[-+*]%|[-+*/%^&|<>!=])=?|[?~!*&]/,
    punctuation: /[.:,;(){}[\]]/
  };

  Prism.languages.mine = {
    comment: [
      {
        pattern: /#.*/,
        alias: "file-comment"
      },
      {
        pattern: /\/\/\/.*/,
        alias: "doc-comment"
      },
      /\/{2}.*/
    ],
    structure: [
      {
        pattern: /╔[^\n]*?╗/,
        alias: "structure-l1"
      },
      {
        pattern: /╚[^\n]*?╝/,
        alias: "structure-l1"
      },
      {
        pattern: /┌[^\n]*?┐/,
        alias: "structure-l2"
      },
      {
        pattern: /└[^\n]*?┘/,
        alias: "structure-l2"
      },
      {
        pattern: /╭[^\n]*?╮/,
        alias: "structure-l3"
      },
      {
        pattern: /╰[^\n]*?╯/,
        alias: "structure-l3"
      }
    ],
    string: [
      {
        pattern: /(^|[^\\@])c?"(?:[^"\\\r\n]|\\.)*"/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /([\r\n])([ \t]+c?\\{2}).*(?:(?:\r\n?|\n)\2.)*/,
        lookbehind: true,
        greedy: true
      }
    ],
    char: {
      pattern: /(^|[^\\])'(?:[^'\\\r\n]|[\uD800-\uDFFF]{2}|\\(?:.|x[a-fA-F\d]{2}|u\{[a-fA-F\d]{1,6}\}))'/,
      lookbehind: true,
      greedy: true
    },
    builtin: /\b@(?!\d)\w+(?=\s*\()/,
    "as-keyword": /\bas\b/,
    "label": {
      pattern: /(\b(?:break|continue)\s*:\s*)\w+\b|\b(?!\d)\w+\b(?=\s*:\s*(?:\{|while\b|loop\b))/,
      lookbehind: true
    },
    "class-name": [
      {
        pattern: /\b(?!\d)\w+(?=\s*=\s*(?:packed\s+)?class\s*[({])/,
        inside: {}
      },
      {
        pattern: /((?:class|errset)\s+)((?!\d)\w+)/,
        lookbehind: true,
        inside: {}
      },
      {
        pattern: /\b(?!\d)\w+(?=\s*<)/,
        inside: {}
      },
      {
        pattern: /(:\s*)<TYPE>(?=\s*(?:<ALIGN>\s*)?[=;,)])|<TYPE>(?=\s*(?:<ALIGN>\s*)?{)/
          .replace(/<TYPE>/g, n(typePattern))
          .replace(/<ALIGN>/g, n(align)),
        lookbehind: true,
        inside: simpleTokens
      },
      {
        pattern: /(:\s*)((?!\d)\w+)/,
        lookbehind: true,
        inside: {}
      },
      {
        pattern: /(\)\s*)<TYPE>(?=\s*(?:<ALIGN>\s*)?{)/
          .replace(/<TYPE>/g, n(typePattern))
          .replace(/<ALIGN>/g, n(align)),
        lookbehind: true,
        inside: simpleTokens
      }
    ],
    "builtin-type": {
      pattern: /\b(?:bool|comptime_(?:float|int)|f(?:16|32|64|128)|[iu][0-9]+|size|noreturn|type|void|T)\b/,
      alias: "keyword"
    },
    "control-flow": {
      pattern: /\b(?:if|else|match|for|loop|while|return|break|continue|fail)\b/,
      alias: "control-flow"
    },
    modifier: /\b(?:pub|prv|comptime|inline)\b/,
    keyword: keywordsRegex,
    generic: {
      pattern: /<\s*(?:[^<>]|<[^<>]*>)*>/,
      inside: {
        "class-name": {
          pattern: /\b(?!\d)\w+\b/,
          alias: "class-name"
        }
      }
    },
    type: {
      pattern: /(:\s*)(?:\.\.\.\s*)?(?!\d)\w+\b/,
      lookbehind: true,
      alias: "class-name"
    },
    returnType: {
      pattern: /(\)\s*)((?!\d)\w+)(?=\s*\{)/,
      lookbehind: true,
      alias: "class-name"
    },
    arrayType: {
      pattern: /(\[\]\s*)((?!\d)\w+)/,
      lookbehind: true,
      alias: "class-name"
    },
    parameter: {
      pattern: /(^|[(,]\s*(?:\.{3}\s*)?)(?!\d)\w+\b(?=\s*[:=])/,
      lookbehind: true,
      alias: "parameter"
    },
    function: /\b(?!\d)\w+(?=\s*\()/,
    variable: /\b(?!\d)\w+\b/,
    number: /\b(?:0b[01]+|0o[0-7]+|0x[a-fA-F\d]+(?:\.[a-fA-F\d]*)?(?:[pP][+-]?[a-fA-F\d]+)?|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)\b/,
    operator: /\.[*?]|\.{2,3}|[-=]>|\*\*|\+\+|\|\||(?:<<|>>|[-+*]%|[-+*/%^&|<>!=])=?|[?~]/,
    punctuation: /[.:,;(){}[\]]/
  };
}(Prism);

(function() {
  var e = document.createElement("style");
  e.textContent = [
    ".token.keyword          { color: #569cd6 }",
    ".token.modifier         { color: #546ca5 }",
    ".token.builtin-type     { color: #4ec9b0 }",
    ".token.class-name       { color: #4ec9b0 }",
    ".token.control-flow     { color: #c586c0 }",
    ".token.parameter        { color: #9cdcfe }",
    ".token.variable         { color: #9cdcfe }",
    ".token.as-keyword       { color: #569cd6 }",
    ".token.structure-l1,",
    ".token.structure-l2,",
    ".token.structure-l3     { color: #6d6d6d }"
  ].join("\n");
  document.head.appendChild(e);
})();
