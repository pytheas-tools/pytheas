# Codeblock Web Component

Stencil is also great for building entire apps. For that, use the [stencil-app-starter](https://github.com/ionic-team/stencil-app-starter) instead.

# Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

## Using this component

### Script tag

-   [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)
-   Put a script tag similar to this `<script src='https://unpkg.com/my-component@0.0.1/dist/mycomponent.js'></script>` in the head of your index.html
-   Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

-   Run `npm install my-component --save`
-   Put a script tag similar to this `<script src='node_modules/my-component/dist/mycomponent.js'></script>` in the head of your index.html
-   Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

-   Run `npm install my-component --save`
-   Add an import to the npm packages `import my-component;`
-   Then you can use the element anywhere in your template, JSX, html etc
