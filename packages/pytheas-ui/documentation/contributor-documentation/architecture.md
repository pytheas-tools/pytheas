## Architecture

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
https://github.com/leonadler/drag-and-drop-across-browsers
