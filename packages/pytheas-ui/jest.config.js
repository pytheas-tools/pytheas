let tsJest = require('ts-jest');
let config = tsJest.createJestPreset();

config.testEnvironment = 'jsdom';
config.testMatch = ['**/app/**/*.spec.ts'];

config.globals = {
    'ts-jest': {
        diagnostics: false
    }
};
config.collectCoverageFrom = ['**/app/**/*.ts', '!**/test'];

config.setupFiles = ['./test/setup-jest.js'];

config.coveragePathIgnorePatterns = ['./app/app.ts', './app/web-components.ts', './app/utils/events.ts', './app/utils/pubsub.ts'];

module.exports = config;
