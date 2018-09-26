let tsJest = require('ts-jest')
let config = tsJest.createJestPreset();

config.testEnvironment = 'jsdom';
config.testMatch = [
    "**/app/**/*.spec.ts"
];

config.globals = {
    'ts-jest': {
        diagnostics: false
    }
};
config.collectCoverageFrom = [
    "**/app/**/*.ts",
    "!**/test"
]

module.exports = config;