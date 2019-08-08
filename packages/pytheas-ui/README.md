# Pytheas ui

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pytheas-tools_pytheas&metric=alert_status)](https://sonarcloud.io/dashboard?id=pytheas-tools_pytheas)

Sourcecode of the main UI of the application

```bash
# Install dependencies
npm install

# Run the app for main development
npm start

# Build
npm run build

# Unit tests of UI
npm run build:dev:test
npm run test:unit

# E2E tests
npm run build:dev:test
npm run test:e2e
```

## Notes on E2E testing

Testcafe was selected as a cross browser solution without WebDriver.
An issue with their internal http-reverse-proxy and native ES6 module breaks E2E testing with Stencil Web Components.
-> Switching to Cypress.io during the fix of this issue. Test onl on Chrome.
