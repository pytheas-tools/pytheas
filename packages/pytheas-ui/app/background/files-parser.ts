import { ReadedFile } from './files-reader';

import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../utils/events';

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

        const { tsquery } = <any>window;

        return new Promise((resolve, reject) => {
            files.forEach(file => {
                file.ast = tsquery.tsquery.ast(file.sourcecode);
                file.importStatements = tsquery.tsquery(file.ast, 'ImportDeclaration');
            });

            console.log('Parsed files: ', files);
            pubsub.publish(EVENTS.FILES_PARSED);
            resolve();
        });
    }

    getParsedFiles() {
        return this.parsedFiles;
    }
}

export default FilesParser.getInstance();
