let tsJest = require('ts-jest/utils');
let config = tsJest.createJestPreset();

config.testEnvironment = 'jsdom';
config.transform = {
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/@stencil/core/testing/jest.preprocessor.js'
};

config.testMatch = ['<rootDir>/**/*.spec.ts'];
config.moduleFileExtensions = ['ts', 'tsx', 'js', 'json', 'jsx'];

// config.setupFiles = ['./test/setup-jest.js'];

module.exports = config;