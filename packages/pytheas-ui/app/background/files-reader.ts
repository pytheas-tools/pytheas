import { extensionToLanguage } from '../utils/extension-to-language';
import { getExtension, getName } from '../utils/fs';

export interface FileFromElectron {
    path: string;
    size: number;
}

export interface ReadedFile {
    path: string;
    name: string;
    extension: string;
    language: string;
    sourcecode: string | ArrayBuffer;
}

/**
 * Read files
 * - in browser use FileReader API
 * - in electron, use Node.js native fs package
 */
class FilesReader {
    browserReader = new FileReader();
    electronReader: any;
    private static instance: FilesReader;
    private constructor() {}
    static getInstance() {
        if (!FilesReader.instance) {
            FilesReader.instance = new FilesReader();
            /**
             * Init reader, get reference in Electron of fs module
             */
            if (typeof require !== 'undefined') {
                FilesReader.instance.electronReader = require('fs');
            }
        }
        return FilesReader.instance;
    }

    /**
     * Read a list of files from browser drop
     * @param files Array List of files
     */
    readFilesFromBrowser(files: FileEntry[]): Promise<ReadedFile[]> {
        let i = 0;
        const len = files.length,
            readedFiles: ReadedFile[] = [];
        return new Promise((resolve, reject) => {
            const loopFiles = () => {
                const fileToRead = files[i];
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
     * Read a list of files from fetch calls
     * @param files Array List of files
     */
    readFilesFromFetchCall(files: FileEntry[]): Promise<ReadedFile[]> {
        let i = 0;
        const len = files.length,
            readedFiles: ReadedFile[] = [];
        return new Promise((resolve, reject) => {
            for (i; i < len; i++) {
                readedFiles.push(this.readFileFromFetchCall(files[i]));
            }
            resolve(readedFiles);
        });
    }

    /**
     * Read a file from fetch call
     * @param file Json data for file
     * @returns Promise
     */
    private readFileFromFetchCall(file: any): ReadedFile {
        const fileExtension = getExtension(file.path);
        return {
            path: file.path,
            name: getName(file.path),
            extension: fileExtension,
            language: extensionToLanguage(fileExtension),
            sourcecode: file.data
        };
    }

    /**
     * Read a file from browser drop using FileReader
     * @param file FileEntry File to read
     * @returns Promise
     */
    private readFileFromBrowser(file: any): Promise<ReadedFile> {
        return new Promise((resolve, reject) => {
            this.browserReader.onload = e => {
                const readedFile: ReadedFile = {
                    path: file.fullPath,
                    name: file.name,
                    extension: file.extension,
                    language: extensionToLanguage(file.extension),
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
     * Read a list of files from Electron using fs
     * @param files Array List of files
     * @returns Promise
     */
    readFilesFromElectron(files: FileFromElectron[]): Promise<ReadedFile[]> {
        let i = 0;
        const len = files.length,
            readedFiles: ReadedFile[] = [];
        return new Promise((resolve, reject) => {
            const loopFiles = () => {
                const fileToRead = files[i];
                if (i < len) {
                    this.readFileFromElectron(fileToRead)
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
     * Read a file from Electron using fs
     * @param file FileEntry File to read
     * @returns Promise
     */
    private readFileFromElectron(file: FileFromElectron): Promise<ReadedFile> {
        return new Promise((resolve, reject) => {
            this.electronReader.readFile(file.path, 'utf8', (err: string, contents: string) => {
                if (err) {
                    reject(err);
                }
                const path = require('path');

                const fileExtension = path.extname(file.path).replace('.', '');

                const readedFile: ReadedFile = {
                    path: file.path,
                    name: path.basename(file.path),
                    extension: fileExtension,
                    language: extensionToLanguage(fileExtension),
                    sourcecode: contents
                };
                resolve(readedFile);
            });
        });
    }
}

export default FilesReader.getInstance();
