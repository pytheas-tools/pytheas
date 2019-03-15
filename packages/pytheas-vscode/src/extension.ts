import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

import { getExtension, getName } from './fs';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('pytheas.start', () => {
            PytheasPanel.createOrShow(context.extensionPath);
        })
    );
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

        const readedFiles = [];

        vscode.workspace.findFiles('**/*').then(files => {
            let i = 0,
                len = files.length;

            const loop = () => {
                if (i < len) {
                    vscode.workspace
                        .openTextDocument(files[i].path)
                        .then(file => {
                            readedFiles.push({
                                extension: getExtension(file.fileName),
                                language: file.languageId,
                                name: getName(file.fileName),
                                path: file.fileName,
                                sourcecode: file.getText(),
                                sloc: ''
                            });
                            i++;
                            loop();
                        });
                } else {
                    console.log('end read: ', readedFiles);
                    this._panel.webview.postMessage({
                        command: 'readedFiles',
                        files: readedFiles
                    });
                }
            };
            loop();
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
        const filePath: vscode.Uri = vscode.Uri.file(
            path.join(this._extensionPath, 'media', 'index.html')
        );
        let rawHTMl = fs.readFileSync(filePath.fsPath, 'utf8');

        const CSSFilePath = vscode.Uri.file(
            path.join(this._extensionPath, 'media', 'styles/app.css')
        );
        const CSSFileFinalPath = CSSFilePath.with({
            scheme: 'vscode-resource'
        });
        rawHTMl = rawHTMl.replace('styles/app.css', CSSFileFinalPath);

        // TODO : make this generic/dynamic

        const AppJSFilePath = vscode.Uri.file(
            path.join(this._extensionPath, 'media', 'scripts/app.js')
        );
        const AppJSFileFinalPath = AppJSFilePath.with({
            scheme: 'vscode-resource'
        });
        rawHTMl = rawHTMl.replace('scripts/app.js', AppJSFileFinalPath);

        const AppJSES6FilePath = vscode.Uri.file(
            path.join(this._extensionPath, 'media', 'scripts/app_es6.js')
        );
        const AppJSES6FileFinalPath = AppJSES6FilePath.with({
            scheme: 'vscode-resource'
        });
        rawHTMl = rawHTMl.replace('scripts/app_es6.js', AppJSES6FileFinalPath);

        const AppJSSplitFilePath = vscode.Uri.file(
            path.join(this._extensionPath, 'media', 'scripts/split.min.js')
        );
        const AppJSSplitFileFinalPath = AppJSSplitFilePath.with({
            scheme: 'vscode-resource'
        });
        rawHTMl = rawHTMl.replace(
            'scripts/split.min.js',
            AppJSSplitFileFinalPath
        );

        const AppJSCodemirrorFilePath = vscode.Uri.file(
            path.join(this._extensionPath, 'media', 'scripts/codemirror.js')
        );
        const AppJSCodemirrorFileFinalPath = AppJSCodemirrorFilePath.with({
            scheme: 'vscode-resource'
        });
        rawHTMl = rawHTMl.replace(
            'scripts/codemirror.js',
            AppJSCodemirrorFileFinalPath
        );

        // Parsers

        const AppJSTsqueryFilePath = vscode.Uri.file(
            path.join(this._extensionPath, 'media', 'scripts/tsquery.js')
        );
        const AppJSTsqueryFileFinalPath = AppJSTsqueryFilePath.with({
            scheme: 'vscode-resource'
        });
        rawHTMl = rawHTMl.replace(
            '</body>',
            `<script src="${AppJSTsqueryFileFinalPath}"></script></body>`
        );

        // Web components pytheas

        const AppJSWCPytheasFilePath = vscode.Uri.file(
            path.join(
                this._extensionPath,
                'media',
                'web-components/dist/pytheas.js'
            )
        );
        const AppJSWCPytheasFileFinalPath = AppJSWCPytheasFilePath.with({
            scheme: 'vscode-resource'
        });
        rawHTMl = rawHTMl.replace(
            'web-components/dist/pytheas.js',
            AppJSWCPytheasFileFinalPath
        );

        return rawHTMl;
    }
}
