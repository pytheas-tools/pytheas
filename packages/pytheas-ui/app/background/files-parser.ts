import { ReadedFile } from './files-reader';

import { getSlocInformations } from '../utils/file-sloc';
import ECMAScriptParser from './data/ecmascript/ecmascript-parser';
import JavaParser from './data/java/java-parser';
import StatusbarManager from './managers/statusbar-manager';
import { MESSAGES } from '../utils/messages';
import VueParser from './data/vue/vue-parser';

/**
 * Parse file for their AST using ts-simpe-ast
 * TODO : make it language agnostic, or with a layer that makes easy to support others languages !== .js & .ts
 */
class FilesParser {
    parsedFiles: ReadedFile[] = [];

    private static instance: FilesParser;
    private constructor() {}
    static getInstance() {
        if (!FilesParser.instance) {
            FilesParser.instance = new FilesParser();
        }
        return FilesParser.instance;
    }

    parseFiles(files: any[]) {
        console.log('Readed files: ', files);

        this.parsedFiles = files;

        return new Promise((resolve, reject) => {
            this.loadParsersForFiles().then(
                () => {
                    files.forEach(file => {
                        switch (file.extension) {
                            case 'js':
                            case 'ts':
                                file.ast = ECMAScriptParser.parseFile(file.sourcecode);
                                file.importStatements = ECMAScriptParser.getImportsStatements(file.sourcecode);
                                break;
                            case 'java':
                                file.ast = JavaParser.parseFile(file.sourcecode);
                                break;
                            case 'vue':
                                file.ast = VueParser.parseFile(file.sourcecode);
                            default:
                                break;
                        }
                        try {
                            file.sloc = getSlocInformations(file.sourcecode, file.extension);
                        } catch (e) {
                            file.sloc = 0;
                        }
                    });
                    resolve(files);
                },
                e => {
                    console.log('error: ', e);
                    reject();
                }
            );
        });
    }

    detectParsers(): Set<string> {
        const parsers = new Set();

        this.parsedFiles.forEach(file => {
            switch (file.extension) {
                case 'js':
                case 'ts':
                    parsers.add('tsquery');
                    break;
                case 'java':
                    parsers.add('javaast');
                    break;
                case 'vue':
                    parsers.add('vue-template-compiler');
                    break;
                default:
                    break;
            }
        });

        return parsers;
    }

    loadParsersForFiles() {
        return new Promise((resolveLoadingParsers, rejectLoadingParsers) => {
            const parsersToLoad = this.detectParsers();
            const parsersPromiseLoading: any = [];

            parsersToLoad.forEach(parser => {
                if (!window[parser]) {
                    parsersPromiseLoading.push(
                        new Promise((resolveLoadingParser, rejectLoadingParser) => {
                            const script = document.createElement('script');
                            script.addEventListener('load', () => {
                                console.log(`${parser} parser finished loading and executing`);
                                resolveLoadingParser();
                                StatusbarManager.displayMessage('');
                            });
                            script.addEventListener('error', () => {
                                console.log(`${parser} parser error loading`);
                                rejectLoadingParser();
                            });
                            script.src = `scripts/${parser}.js`;
                            script.async = true;
                            StatusbarManager.displayMessage(MESSAGES.DOWNLOADING_PARSER, true);
                            document.body.appendChild(script);
                        })
                    );
                }
            });

            Promise.all(parsersPromiseLoading).then(
                () => {
                    console.log('All parsers loaded');
                    resolveLoadingParsers();
                },
                () => {
                    rejectLoadingParsers();
                }
            );
        });
    }

    getParsedFiles() {
        return this.parsedFiles;
    }
}

export default FilesParser.getInstance();
