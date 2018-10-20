# Architecture

## UI

-   menu only for desktop version (electron)

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
https://github.com/leonadler/drag-and-drop-across-browsers

## Orchestration

The 2 main windows and the navigation bar are all linked with a global state manager.

-   navigation bar plays the role of time traveler inside the different states : back, next, home for start view; and search bar with directly select an item like a class, or something inside a class

-   graph view emit events for selection, and get a new graph to render, that's it -> NB updates, and code view display linked code blocks

-   code view emit events for statement selection, and get new codeblock to display -> NB updates, and graph view display a new graph

ApplicationManager plays the role of orchestrating all the stuff with a local store

DataManager drives all the data informations : drives the scanner, the reader, the parser. And after that returns specific informations for a selection.

The data layer should contains all the relations/references for a class, and everything inside, functions and properties.

## Relations

In memory graph database ?

https://github.com/typicaljoe/taffydb

http://lokijs.org/#/demo

https://github.com/jbmusso/tinkergraph-js
https://github.com/jbmusso/gremlin-tinkergraph

http://zuudo.github.io/helios.js/

-> simple ES6 map for now in DataManager
