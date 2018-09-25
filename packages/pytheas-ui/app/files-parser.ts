import FilesReader, { ReadedFile, FileFromElectron } from './files-reader';

/**
 * Parse file for their AST using ts-simpe-ast
 */
class FilesParser {
    files: any[] = [];

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
        this.files.push(file);
    }
    addFiles(files: FileEntry[]) {
        this.files = [...this.files, ...files];
    }
    parseBrowserFiles() {
        console.log('files from browser listed: ', this.files);
        FilesReader.readFilesFromBrowser(this.files).then(
            readedFiles => {
                console.log('files readed, start ast parsing: ', readedFiles);
            },
            e => {
                console.error(e);
            }
        );
    }
    parseElectronFiles() {
        console.log('files from electron listed: ', this.files);
        FilesReader.readFilesFromElectron(this.files).then(
            (readedFiles: ReadedFile[]) => {
                console.log('files readed, start ast parsing: ', readedFiles);
            },
            e => {
                console.error(e);
            }
        );
    }

    clearFiles() {
        this.files = [];
    }
}

export default FilesParser.getInstance();
