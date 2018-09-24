export interface FileFromElectron {
    path: string;
    size: number;
}

export interface ReadedFile {
    path: string;
    name: string;
    sourcecode: string | ArrayBuffer;
}

/**
 * Read files
 * - in browser use FileReader API
 * - in electron, use Node.js native fs package
 */
class FilesReader {
    browserReader = new FileReader();
    electronReader;
    private static instance: FilesReader;
    private constructor() {}
    static getInstance() {
        if (!FilesReader.instance) {
            FilesReader.instance = new FilesReader();
        }
        return FilesReader.instance;
    }
    /**
     * Init reader, get reference in Electron of fs module
     */
    init() {
        if (typeof require !== 'undefined') {
            this.electronReader = require('fs');
        }
    }
    /**
     * Read a list of files from browser drop
     * @param files Array List of files
     */
    readFilesFromBrowser(files: FileEntry[]) {
        let i = 0,
            len = files.length;
        const readedFiles = [];
        return new Promise((resolve, reject) => {
            const loopFiles = () => {
                let fileToRead = files[i];
                if (i < len) {
                    this.readFileFromBrowser(fileToRead)
                        .then(readedFile => {
                            readedFiles.push(readedFile);
                            i++;
                            loopFiles();
                        })
                        .catch(e => {
                            reject(e);
                        });
                } else {
                    resolve(readedFiles);
                }
            };
            loopFiles();
        });
    }
    /**
     * Read a file from browser drop using FileReader
     * @param file FileEntry File to read
     * @returns Promise
     */
    readFileFromBrowser(file: FileEntry): Promise {
        return new Promise((resolve, reject) => {
            this.browserReader.onload = e => {
                const readedFile: ReadedFile = {
                    path: file.fullPath,
                    name: file.name,
                    sourcecode: this.browserReader.result
                };
                resolve(readedFile);
            };
            this.browserReader.onerror = e => {
                reject(e);
            };
            this.browserReader.readAsText(file);
        });
    }
    /**
     * Read a file from Electron using fs
     * @param file FileEntry File to read
     * @returns Promise
     */
    readFilesFromElectron(file: FileFromElectron): Promise {}
}

export default new FilesReader();
