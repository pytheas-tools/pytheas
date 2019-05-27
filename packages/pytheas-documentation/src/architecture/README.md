# Architecture

## Packages

The source code is splitted in packages :

-   **app** : Electron App wrapper
-   **documentation** : technical documentation
-   **ui** : core UI injected in Electron or Visual Studio
-   **ui-static-dependencies** : core UI dependencies
-   **vscode** : Visual Studio Code wrapper
-   **website** : source code of public website, coming soon

## User Interface

![Screenshot](/pytheas/contributors-documentation/screenshot.png)

-   top file menu : only for desktop version (electron)

-   main screen seperated into 2 windows : one for the graph view and another one for codebase reading

-   graph window has :

    -   navigation bar with history
    -   graph view with controls

-   codebase window has :

    -   code editor in reading mode for each file used inside the current graph view

-   status bar : left part for messages, right part for miscellaneous informations

## Source code map

Here is the main relations graph between TypeScript sources of the project.

![Madge](/pytheas/contributors-documentation/madge.png)
