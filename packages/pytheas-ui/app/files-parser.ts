import FilesReader, { ReadedFile, FileFromElectron } from './files-reader';

import { pubsub } from './utils/pubsub';
import { EVENTS } from './events';

/**
 * Parse file for their AST using ts-simpe-ast
 * TODO : make it language agnostic, or with a layer that makes easy to support others languages !== .js & .ts
 */
class FilesParser {
    rawFiles: any[] = [];
    readedFiles: ReadedFile[] = [];

    private static instance: FilesParser;
    private constructor() {}
    static getInstance() {
        if (!FilesParser.instance) {
            FilesParser.instance = new FilesParser();
        }
        return FilesParser.instance;
    }
    init() {}
    addFile(file: FileEntry) {
        this.rawFiles.push(file);
    }
    addFiles(files: FileEntry[]) {
        this.rawFiles = [...this.rawFiles, ...files];
    }
    parseBrowserFiles() {
        console.log('files from browser listed: ', this.rawFiles);
        FilesReader.readFilesFromBrowser(this.rawFiles).then(
            readedFiles => {
                this.readedFiles = readedFiles;
                console.log('files readed, start ast parsing: ', readedFiles);
                this.parseFiles();
            },
            e => {
                console.error(e);
            }
        );
    }
    parseElectronFiles() {
        console.log('files from electron listed: ', this.rawFiles);
        FilesReader.readFilesFromElectron(this.rawFiles).then(
            (readedFiles: ReadedFile[]) => {
                this.readedFiles = readedFiles;
                console.log('files readed, start ast parsing: ', readedFiles);
                this.parseFiles();
            },
            e => {
                console.error(e);
            }
        );
    }

    parseFiles() {
        console.log('Parse files');
        const project = new window['tsSimpleAst']['default']({ useVirtualFileSystem: true });
        this.readedFiles.forEach(file => {
            project.createSourceFile(file.path, file.sourcecode);
        });
        const sourceFiles = project.getSourceFiles();
        console.log(sourceFiles);
        pubsub.publish(EVENTS.FILES_PARSED);
    }

    getReadedFiles() {
        return this.readedFiles;
    }

    clearFiles() {
        this.rawFiles = [];
    }
}

export default FilesParser.getInstance();
