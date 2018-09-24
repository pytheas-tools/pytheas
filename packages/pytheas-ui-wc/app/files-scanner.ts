import Parser from './parser';

//import Walker from 'walker';

let Walker;
if (typeof require !== 'undefined') {
    Walker = require('walker');
}
console.log(Walker);

/**
 * Managing files from drag'n'drop inside main window, or from electron folder selector
 * - in browser use File API
 * - in electron, use Node.js package 'walker'
 */
class FilesScanner {
    countFiles = 0;
    scannedFiles = [];

    private static instance: Parser;
    private constructor() {}
    static getInstance() {
        if (!FilesScanner.instance) {
            FilesScanner.instance = new Parser();
        }
        return FilesScanner.instance;
    }

    /**
     * Start listening if available from electron wrapper which
     */
    init() {
        if (typeof require !== 'undefined') {
            const ipc = require('electron').ipcRenderer;
            ipc.on('folder-selected', (event, path) => {
                console.log('folder-selected from electron wrapper: ', path);
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
                .on('file', (entry, stat) => {
                    if (stat.size > 1024 * 1024) {
                        this.scannedFiles.push({
                            path: entry,
                            size: stat.size,
                            dir: false
                        });
                    }
                })
                .on('error', error => {
                    console.log(error);
                })
                .on('end', () => {
                    Parser.addFiles(this.scannedFiles);
                    Parser.parseFiles();
                });
        }
    }

    private updateCounter(quantity) {
        this.countFiles += quantity;
    }

    private handleFile(file) {
        this.scannedFiles.push(file);

        if (this.scannedFiles.length === this.countFiles) {
            Parser.addFiles(this.scannedFiles);
            Parser.parseFiles();
        }
    }

    private parseFiles(files) {
        this.updateCounter(files.length);

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var entry, reader;

            if (file.isFile || file.isDirectory) {
                entry = file;
            } else if (file.getAsEntry) {
                entry = file.getAsEntry();
            } else if (file.webkitGetAsEntry) {
                entry = file.webkitGetAsEntry();
            } else if (typeof file.getAsFile === 'function') {
                this.handleFile(file.getAsFile());
                continue;
            } else if (File && file instanceof File) {
                this.handleFile(file);
                continue;
            } else {
                this.updateCounter(-1);
                continue;
            }

            if (!entry) {
                this.updateCounter(-1);
            } else if (entry.isFile) {
                entry.file(
                    file => {
                        this.handleFile(file);
                    },
                    err => {
                        console.warn(err);
                    }
                );
            } else if (entry.isDirectory) {
                reader = entry.createReader();

                reader.readEntries(
                    entries => {
                        this.parseFiles(entries);
                        this.updateCounter(-1);
                    },
                    err => {
                        console.warn(err);
                    }
                );
            }
        }
    }
}

export default new FilesScanner();
