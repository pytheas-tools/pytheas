module.exports = {
    "transform": {
        "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/@stencil/core/testing/jest.preprocessor.js"
    },
    "testPathIgnorePatterns": [
        "<rootDir>/components/codeblock/codeblock/"
    ],
    "testMatch": [
        "**/components/**/*.spec.ts"
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json",
        "jsx"
    ]
};