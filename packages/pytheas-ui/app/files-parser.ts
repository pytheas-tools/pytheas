import FilesReader, { ReadedFile, FileFromElectron } from './files-reader';

/**
 * Parse file for their AST using ts-simpe-ast
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
    }

    clearFiles() {
        this.rawFiles = [];
    }
}

export default FilesParser.getInstance();
