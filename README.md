# Pytheas

Pytheas is an exploration tool for your (Type|Java)Script codebase

## Architecture / WIP

-   web interface

-   desktop wrapper using electron

## Web Interface

-   menu
-   main screen seperated into 2 windows : one for the graph view and another one for codebase reading

-   graph view has :

    -   navigation bar with history
    -   graph view with controls

-   codebase view has :

    -   code editor in reading mode for each file used inside the current graph view

-   split views : https://nathancahill.github.io/Split.js/

The web interface should manage getting files for exploration in many different ways, and the parser should be context agnostic :

-   drag'n'drop files
-   drag'n'drop one main folder
-   using menu which open a path finder
-   a CLI as light as possible : pytheas src & boom web browser open with UI and parsed files

https://www.html5rocks.com/en/tutorials/file/filesystem

## Technologies

-   UI with Angular ? + webcomponents ?

-   CSS with BEM methodology http://getbem.com/

-   graph : HTML + CSS + JSPlumb libray for network rendering (https://jsplumbtoolkit.com/)

    -   TODO : validate global layout with css grid

-   codebase view : monaco editor (https://microsoft.github.io/monaco-editor/)

-   codebase parsing : ts-simple-ast

-   lerna for managing packages (https://lernajs.io/) ?
