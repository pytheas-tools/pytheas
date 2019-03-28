import { getExtension } from '../../utils/fs';
import { FileFromElectron } from './files-reader';

import Notifier from '../../utils/notifier';

import { SUPPORTED_FILES } from './supported-files';
import { isFileSupported } from './files.utils';

let Walker: any;
if (typeof require !== 'undefined') {
    Walker = require('walker');
}

/**
 * Managing files from drag'n'drop inside main window, or from electron folder selector
 * - in browser use File API
 * - in electron, use Node.js package 'walker'
 */
class FilesScanner {
    private static instance: FilesScanner;

    countFiles = 0;
    scannedFiles: any = [];

    scanPromise: any;
    scanResolve: any;
    scanReject: any;

    notSupportedExtensions = new Set();

    private constructor() {}
    static getInstance() {
        if (!FilesScanner.instance) {
            FilesScanner.instance = new FilesScanner();
        }
        return FilesScanner.instance;
    }

    clearInternals() {
        this.scannedFiles = [];
        this.countFiles = 0;
        this.notSupportedExtensions.clear();
    }

    /**
     * Scan files with File API
     * @param ev DragEvent Event from browser
     */
    scanFilesFromBrowser(ev: DragEvent) {
        this.scanPromise = new Promise((resolve, reject) => {
            this.scanResolve = resolve;
            this.scanReject = reject;
            this.clearInternals();
            if (ev.dataTransfer && ev.dataTransfer.items) {
                this.parseFiles(ev.dataTransfer.items);
            } else if (ev.dataTransfer && ev.dataTransfer.files) {
                this.parseFiles(ev.dataTransfer.files);
            } else if (ev.target && ev.target.files) {
                this.parseFiles(ev.target.files);
            }
        });
        return this.scanPromise;
    }

    /**
     * Scan files with Node.js walker package
     * @param path string Folder path from electron
     */
    scanFilesFromElectron(path: string) {
        this.scanPromise = new Promise((resolve, reject) => {
            this.scanResolve = resolve;
            this.scanReject = reject;
            if (typeof require !== 'undefined') {
                this.clearInternals();
                Walker(path)
                    .on('file', (file: any, stat: any) => {
                        const fileFromElectron: FileFromElectron = { path: file, size: stat.size };
                        this.scannedFiles.push(fileFromElectron);
                    })
                    .on('error', (error: string) => {
                        console.log(error);
                        this.scanReject(error);
                    })
                    .on('end', () => {
                        this.scanResolve(this.scannedFiles);
                    });
            }
        });
        return this.scanPromise;
    }

    private getAllNotSupportedExtensions(): string {
        const extensions = Array.from(this.notSupportedExtensions);
        let result;
        if (extensions.length > 10) {
            result = extensions
                .slice(0, 10)
                .concat(['...'])
                .join(', ');
        } else {
            result = extensions.join(', ');
        }
        return result;
    }

    private updateCounter(quantity: number) {
        this.countFiles += quantity;
    }

    private handleFile(file: FileEntry | File) {
        if (isFileSupported(file.extension)) {
            this.scannedFiles.push(file);
        } else {
            this.notSupportedExtensions.add(file.extension);
            this.updateCounter(-1);
        }

        if (this.scannedFiles.length === this.countFiles) {
            const extensionsNotSupported = this.getAllNotSupportedExtensions();
            if (extensionsNotSupported.length > 0) {
                Notifier.info(`${extensionsNotSupported} files not supported`);
            }
            this.scanResolve(this.scannedFiles);
        }
    }

    private parseFiles(files: any) {
        this.updateCounter(files.length);

        let i = 0;
        const len = files.length;

        const loopFiles = () => {
            if (i < len) {
                const file: any = files[i];
                let entry: any;
                let reader: any;

                if (file.isFile || file.isDirectory) {
                    entry = file;
                } else if (file.getAsEntry) {
                    entry = file.getAsEntry();
                } else if (file.webkitGetAsEntry) {
                    entry = file.webkitGetAsEntry();
                } else if (typeof file.getAsFile === 'function') {
                    this.handleFile(file.getAsFile());
                    i++;
                    loopFiles();
                } else if (File && file instanceof File) {
                    file.fullPath = file.name;
                    file.extension = getExtension(file.name);
                    this.handleFile(file);
                    i++;
                    loopFiles();
                } else {
                    this.updateCounter(-1);
                    i++;
                    loopFiles();
                }

                if (!entry) {
                    this.updateCounter(-1);
                    i++;
                    loopFiles();
                } else if (entry.isFile) {
                    entry.file(
                        (fileEntry: File) => {
                            const finalFile = Object.assign(fileEntry, {
                                fullPath: entry.fullPath,
                                extension: getExtension(entry.name)
                            });
                            this.handleFile(finalFile);
                            i++;
                            loopFiles();
                        },
                        (err: string) => {
                            console.warn(err);
                        }
                    );
                } else if (entry.isDirectory) {
                    reader = entry.createReader();

                    reader.readEntries(
                        (entries: any) => {
                            this.parseFiles(entries);
                            this.updateCounter(-1);
                            i++;
                            loopFiles();
                        },
                        (err: string) => {
                            console.warn(err);
                        }
                    );
                }
            }
        };
        loopFiles();
    }
}

export default FilesScanner.getInstance();
