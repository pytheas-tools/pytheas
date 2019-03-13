import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('pytheas.start', () => {
            PytheasPanel.createOrShow(context.extensionPath);
        })
    );

    console.log('ACTIVATE');
}

/**
 * Manages pytheas webview panels
 */
class PytheasPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: PytheasPanel | undefined;

    public static readonly viewType = 'pytheas';

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionPath: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        if (PytheasPanel.currentPanel) {
            PytheasPanel.currentPanel._panel.reveal(column);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            PytheasPanel.viewType,
            'Pytheas Exploration',
            column || vscode.ViewColumn.One,
            {
                // Enable javascript in the webview
                enableScripts: true,

                // And restrict the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.file(path.join(extensionPath, 'media'))
                ]
            }
        );

        PytheasPanel.currentPanel = new PytheasPanel(panel, extensionPath);
    }

    public static revive(panel: vscode.WebviewPanel, extensionPath: string) {
        PytheasPanel.currentPanel = new PytheasPanel(panel, extensionPath);
    }

    private constructor(panel: vscode.WebviewPanel, extensionPath: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;

        this._panel.webview.html = this._getHtmlForWebview();

        console.log(vscode.workspace.textDocuments);

        vscode.workspace.findFiles('**/*').then(files => {
            console.log(files);
            vscode.workspace.openTextDocument(files[0].path).then(file => {
                console.log(file);
            });
        });

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Update the content based on view changes
        this._panel.onDidChangeViewState(e => {}, null, this._disposables);
    }

    public dispose() {
        PytheasPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _getHtmlForWebview() {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pytheas exploration tool</title>
                <style>
                    body {
                        background-color: white !important;
                    }                    
                </style>
            </head>
            <body>
                <p>HELLO WORLD</p>
                <nova-badge score="1"></nova-badge>
                <script src="https://unpkg.com/@nutrition-web-components/nova@0.0.1/dist/nova.js"></script>
            </body>
            </html>`;
    }
}
