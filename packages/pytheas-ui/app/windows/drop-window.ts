import FilesScanner from '../files-scanner';
import FilesReader from '../files-reader';
import FilesParser from '../files-parser';

interface ElectronEvent {
    sender: EventEmitter
}

class DropWindow {
    $element: HTMLElement;

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
            FilesScanner.scanFilesFromBrowser(ev).then((scannedFiles: any[]) => {
                FilesReader.readFilesFromBrowser(scannedFiles).then(readedFiles => {
                    FilesParser.parseFiles(readedFiles).then(() => {
                        console.log('files parsed');
                    });
                });
            });
        });
        /**
         * Listen dragover event and cancel it to dispatch drop event
         */
        document.addEventListener('dragover', () => {
            event.preventDefault();
        });
        /**
         * Start listening if available from electron wrapper which
         */
        if (typeof require !== 'undefined') {
            const ipc = require('electron').ipcRenderer;
            ipc.on('folder-selected', (event: ElectronEvent, path: string) => {
                console.log('folder-selected from electron wrapper: ', event, path);
                FilesScanner.scanFilesFromElectron(path).then((scannedFiles: any[]) => {
                    FilesReader.readFilesFromElectron(scannedFiles).then(readedFiles => {
                        FilesParser.parseFiles(readedFiles).then(() => {
                            console.log('files parsed');
                        });
                    });
                });
            });
        }
    }
}

export default DropWindow.getInstance();
