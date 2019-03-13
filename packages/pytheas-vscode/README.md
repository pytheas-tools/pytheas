# VSCode extension

Embed Pytheas into VSCode workspace with an extension.

Use VSCode Insiders for isolated environment.

## Install dependencies

```bash
npm i
```

## Start VSCode Insiders

Open `pytheas-vscode` folder.

## Start Extension

-   open VSCode Debug tab.
-   click on 'Run Extension' with play button in top bar.
-   in the new window opened, open a folder from `test-sources`
-   hit Ctrl + Shift + P, and in the input bar, type Pytheas, and select 'Pytheas : Start new exploration session'

## Debugging the rendred webview

Ctrl + Shift + P & `Open Webview Developer Tools` VS Code command lets you debug the webview.

## Workflow

The codebase of the extension has two main purposes :

-   start the extension with Pytheas inside
-   deliver to Pytheas list of files inside current workspace for starting Pytheas exploration

## Resources

https://code.visualstudio.com/api/extension-guides/webview

https://github.com/Microsoft/vscode-extension-samples/tree/master/webview-sample
