const path = require('path');
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".ts",
          ".vue",
        ]
      }
    }
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended"
  ],
  plugins: [
    "@typescript-eslint",
    "vue"
  ],
  rules: {
    "import/no-cycle": "off",
    "no-param-reassign": "off",
    "lines-between-class-members": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
  }
};
