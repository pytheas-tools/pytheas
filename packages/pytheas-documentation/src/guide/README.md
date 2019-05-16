# Introduction

![Screenshot](/pytheas/contributors-documentation/screenshot.png)

Pytheas is a visual source explorer.

This documentation is for people who wants to contribute to this project. It explains the technical architecture.

## Getting started

The web interface should manage getting files for exploration in many different ways, and the parser should be context agnostic :

-   drag'n'drop files
-   drag'n'drop one main folder
-   using menu which open a path finder
-   a CLI as light as possible : pytheas src & boom web browser open with UI and parsed files
-   vscode project & an extension

## Languages support

-   JS
-   TS
-   Vue.js files : https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#readme
-   react :
    -   detect jsx in js file ?
    -   jsx ast
        https://esprima.readthedocs.io/en/latest/syntactic-analysis.html#jsx-syntax-support
        https://github.com/facebook/jsx/blob/master/AST.md
        Typescript ? -> astexplorer
-   Java ? : https://github.com/urish/java-ast / https://github.com/tunnelvisionlabs/antlr4ts#readme
-   Python ? : https://github.com/differentmatt/filbert + https://python-ast-explorer.com/
-   PHP ? : https://github.com/glayzzle/php-parser
-   Kotlin ? : https://github.com/antlr/grammars-v4/tree/master/kotlin
-   C# : https://github.com/sebastienros/esprima-dotnet
-   Go : https://github.com/gopherjs/gopherjs + https://dmitri.shuralyov.com/projects/AST-explorer/ + https://golang.org/src/go/ast/example_test.go + https://medium.com/@kentquirk/how-to-use-gopherjs-to-turn-go-code-into-a-javascript-library-1e947703db7a + https://zupzup.org/go-ast-traversal/

**Stackoverflow survey 2018** : https://insights.stackoverflow.com/survey/2018/#technology

-   JavaScript
-   Java
-   Python
-   C#
-   PHP
