import { ReadedFile } from './files-reader';

import { getSlocInformations } from './detectives/file-sloc';
import ECMAScriptParser from './data/ecmascript/ecmascript-parser';
import JavaParser from './data/java/java-parser';

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
            this.loadParserForFiles().then(
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
                            default:
                                break;
                        }
                        file.sloc = getSlocInformations(file.sourcecode, file.extension);
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

    detectParser() {
        let parser = '';

        let ECMAScriptFiles = 0;
        let JavaFiles = 0;

        this.parsedFiles.forEach(file => {
            switch (file.extension) {
                case 'js':
                case 'ts':
                    ECMAScriptFiles += 1;
                    break;
                case 'java':
                    JavaFiles += 1;
                    break;
                default:
                    break;
            }
        });
        const percentOfECMAScriptFiles = (ECMAScriptFiles * 100) / this.parsedFiles.length;
        if (percentOfECMAScriptFiles >= 75) {
            parser = 'tsquery';
        }
        const percentOfJavaFiles = (JavaFiles * 100) / this.parsedFiles.length;
        if (percentOfJavaFiles >= 75) {
            parser = 'javaast';
        }
        return parser;
    }

    loadParserForFiles() {
        return new Promise((resolve, reject) => {
            const parserToLoad = this.detectParser();
            const script = document.createElement('script');
            script.addEventListener('load', () => {
                console.log(`${parserToLoad} parser finished loading and executing`);
                resolve();
            });
            script.addEventListener('error', () => {
                console.log(`${parserToLoad} parser error loading`);
                reject();
            });
            script.src = `scripts/${parserToLoad}.js`;
            script.async = true;
            document.getElementsByTagName('script')[0].parentNode.appendChild(script);
        });
    }

    getParsedFiles() {
        return this.parsedFiles;
    }
}

export default FilesParser.getInstance();
