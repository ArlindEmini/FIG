module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node":true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        "ignoredNodes": [
          "TemplateLiteral"
        ]
      }
    ],
    "no-confusing-arrow": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "prefer-destructuring": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "camelcase": "off",
    "no-return-assign": 0,
    "class-methods-use-this": 0,
    "max-len": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 0,
    "implicit-arrow-linebreak":["error", "beside"],
    "no-multiple-empty-lines": [
      "error", 
      {
        "max": 1 
      }
    ],
    "no-plusplus": 0,
    "eol-last": 0,
    "arrow-body-style": 0,
    "no-param-reassign": 0,
    "consistent-return": 0,
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "block-like", next: "const" },
      { blankLine: "always", prev: "block-like", next: "let" },
      { blankLine: "always", prev: "*", next: "export" },
      { blankLine: "always", prev: "block-like", next: "function" },
      { blankLine: "always", prev: "block-like", next: "class" },
      { blankLine: "always", prev: "*", next: "return" }
    ],
  }
}
