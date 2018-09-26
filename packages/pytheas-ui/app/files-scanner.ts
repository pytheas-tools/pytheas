import Parser from './files-parser';
import { FileFromElectron } from './files-reader';
import { EventEmitter } from 'events';

let Walker: any;
if (typeof require !== 'undefined') {
    Walker = require('walker');
}

interface ElectronEvent {
    sender: EventEmitter
}

/**
 * Managing files from drag'n'drop inside main window, or from electron folder selector
 * - in browser use File API
 * - in electron, use Node.js package 'walker'
 */
class FilesScanner {
    countFiles = 0;
    scannedFiles: any = [];

    private static instance: FilesScanner;
    private constructor() {}
    static getInstance() {
        if (!FilesScanner.instance) {
            FilesScanner.instance = new FilesScanner();
        }
        return FilesScanner.instance;
    }

    /**
     * Start listening if available from electron wrapper which
     */
    init() {
        if (typeof require !== 'undefined') {
            const ipc = require('electron').ipcRenderer;
            ipc.on('folder-selected', (event: ElectronEvent, path: string) => {
                console.log('folder-selected from electron wrapper: ', event, path);
                Parser.clearFiles();
                this.clearInternals();
                this.scanFilesFromElectron(path);
            });
        }
    }

    clearInternals() {
        this.scannedFiles = [];
        this.countFiles = 0;
    }

    /**
     * Scan files with File API
     * @param ev DragEvent Event from browser
     */
    scanFilesFromBrowser(ev: DragEvent) {
        Parser.clearFiles();
        this.clearInternals();
        if (ev.dataTransfer && ev.dataTransfer.items) {
            this.parseFiles(ev.dataTransfer.items);
        } else if (ev.dataTransfer && ev.dataTransfer.files) {
            this.parseFiles(ev.dataTransfer.files);
        }
    }

    /**
     * Scan files with Node.js walker package
     * @param path string Folder path from electron
     */
    scanFilesFromElectron(path: string) {
        if (typeof require !== 'undefined') {
            Walker(path)
                .on('file', (file: any, stat: any) => {
                    const fileFromElectron: FileFromElectron = {
                        path: file,
                        size: stat.size
                    };
                    this.scannedFiles.push(fileFromElectron);
                })
                .on('error', (error: string) => {
                    console.log(error);
                })
                .on('end', () => {
                    Parser.addFiles(this.scannedFiles);
                    Parser.parseElectronFiles();
                });
        }
    }

    private updateCounter(quantity: number) {
        this.countFiles += quantity;
    }

    private handleFile(file: FileEntry | File) {
        this.scannedFiles.push(file);

        if (this.scannedFiles.length === this.countFiles) {
            Parser.addFiles(this.scannedFiles);
            Parser.parseBrowserFiles();
        }
    }

    private parseFiles(files: any) {
        this.updateCounter(files.length);

        let i = 0;
        const len = files.length;

        const loopFiles = () => {
            if (i < len) {
                const file: any = files[i];
                let entry: any, reader: any;

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
                    entry.file((fileEntry: File) => {
                            const finalFile = Object.assign(fileEntry, { fullPath: entry.fullPath });
                            this.handleFile(finalFile);
                            i++;
                            loopFiles();
                        }, (err: string) => {
                            console.warn(err);
                        });
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