# File parsing

Here is the process for parsing a file. For now, only _.js and _.ts files are supported.

-   generated the AST of all the file with TSQuery

-   find module definition type (CommonJS, AMD, ES6, or none)

-   Get the dependencies of the file (TypeScript, or JavaScript)

-   find all main exported or defined statements : class, variable, function...

-   store all these informations inside a main registry
