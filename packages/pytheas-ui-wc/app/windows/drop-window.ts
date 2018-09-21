import Parser from '../parser';

class DropWindow {
    $element: HTMLElement;

    countFiles = 0;
    scannedFiles = [];

    private static instance: DropWindow;
    private constructor() {}
    static getInstance() {
        if (!DropWindow.instance) {
            DropWindow.instance = new DropWindow();
        }
        return DropWindow.instance;
    }

    init() {
        /**
         * Listen drop event, and manage files/folder dropped
         */
        document.addEventListener('drop', (ev: DragEvent) => {
            ev.preventDefault();
            Parser.clearFiles();
            this.scannedFiles = [];
            this.countFiles = 0;
            if (ev.dataTransfer && ev.dataTransfer.items) {
                this.parseFiles(ev.dataTransfer.items);
            }
            else if (ev.dataTransfer && ev.dataTransfer.files) {
                this.parseFiles(ev.dataTransfer.files);
            }
        });
        /**
         * Listen dragover event and cancel it to dispatch drop event
         */
        document.addEventListener('dragover', () => {
            event.preventDefault();
        });
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
            }
            else if (file.getAsEntry) {
                entry = file.getAsEntry();
            }
            else if (file.webkitGetAsEntry) {
                entry = file.webkitGetAsEntry();
            }
            else if (typeof file.getAsFile === 'function') {
                this.handleFile(file.getAsFile());
                continue;
            }
            else if (File && file instanceof File) {
                this.handleFile(file);
                continue;
            }
            else {
                this.updateCounter(-1);
                continue;
            }

            if (!entry) {
                this.updateCounter(-1);
            }
            else if (entry.isFile) {
                entry.file((file) => {
                    this.handleFile(file);
                }, (err) => {
                    console.warn(err);
                });
            }
            else if (entry.isDirectory) {
                reader = entry.createReader();

                reader.readEntries((entries) => {
                    this.parseFiles(entries);
                    this.updateCounter(-1);
                }, (err) => {
                    console.warn(err);
                });
            }
        }
    }
}

export default new DropWindow();
