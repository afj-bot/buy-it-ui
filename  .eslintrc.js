module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 6,
        sourceType: "module",
    },
    globals: {
        eslint: true,
        expect: true,
        it: true,
        xit: true,
        describe: true,
        xdescribe: true,
        jest: true,
        process: true,
        global: true,
        afterEach: true,
        beforeEach: true,
        beforeAll: true,
        module: true,
        __dirname: true,
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "no-magic-numbers": ["error", { ignore: [-1, 0, 1, 2, 3, 4, 5] }],
        "testing-library/no-node-access": ["error", {"allowContainerFirstChild": true}]
    },
    parser: "babel-eslint",
    settings: {
        react: {
            version: "detect",
        },
    },
};