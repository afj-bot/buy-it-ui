module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard"
  ],
  globals: {
    eslint: true,
    expect: true,
    test: true,
    describe: true,
    xdescribe: true,
    jest: true,
    process: true,
    global: true,
    afterEach: true,
    beforeEach: true,
    beforeAll: true,
    module: true,
    __dirname: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react"
  ],
  rules: {
    "no-magic-numbers": ["error", { ignore: [0, 1, 2, 3, 4, 5] }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "comma-dangle": ["error", {
      arrays: "never",
      objects: "awlays",
      functions: "awlays"
    }]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
