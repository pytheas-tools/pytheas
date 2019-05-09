let tsJest = require('ts-jest/utils');
let config = tsJest.createJestPreset();

config.testEnvironment = 'jsdom';
config.testMatch = ['**/src/**/*.spec.ts'];

config.globals = {
    'ts-jest': {
        diagnostics: false
    }
};
config.collectCoverageFrom = ['**/src/**/*.ts', '!**/test'];

config.setupFiles = ['./test/setup-jest.js'];

config.coveragePathIgnorePatterns = ['./src/app.ts', './src/web-components.ts', './src/utils/events.ts', './src/utils/pubsub.ts'];

module.exports = config;