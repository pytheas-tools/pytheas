# Workflow

## Loading Pytheas

TODO

## Project parsing

After Files dropped, folder selected with Electron or workspace in VSCode :

TODO

## Orchestration

The 2 main windows and the navigation bar are all linked with a global state manager.

-   navigation bar plays the role of time traveler inside the different states : back, next, home for start view; and search bar with directly select an item like a class, or something inside a class

-   graph view emit events for selection, and get a new graph to render, that's it -> NB updates, and code view display linked code blocks

-   code view emit events for statement selection, and get new codeblock to display -> NB updates, and graph view display a new graph

ApplicationManager plays the role of orchestrating all the stuff with a local store

DataManager drives all the data informations : drives the scanner, the reader, the parser. And after that returns specific informations for a selection.

The data layer should contains all the relations/references for a class, and everything inside, functions and properties.

## Relations for each file with others

-> simple ES6 map for now in DataManager

-   others solutions ? In memory graph database ?

https://github.com/typicaljoe/taffydb

http://lokijs.org/#/demo

https://github.com/jbmusso/tinkergraph-js
https://github.com/jbmusso/gremlin-tinkergraph

http://zuudo.github.io/helios.js/