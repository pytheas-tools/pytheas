import FilesScanner from '../background/files-scanner';
import FilesReader from '../background/files-reader';
import FilesParser from '../background/files-parser';
import { EventEmitter } from 'events';
import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../utils/events';

interface ElectronEvent {
    sender: EventEmitter;
}

class DropWindow {
    $element: HTMLElement;

    dropped = false;

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
            this.dropped = true;
            FilesScanner.scanFilesFromBrowser(ev).then((scannedFiles: any[]) => {
                FilesReader.readFilesFromBrowser(scannedFiles).then(readedFiles => {
                    FilesParser.parseFiles(readedFiles).then(parsedFiles => {
                        pubsub.publish(EVENTS.FILES_PARSED, parsedFiles);
                    });
                });
            });
        });
        /**
         * Listen dragover event and cancel it to dispatch drop event
         */
        document.addEventListener('dragover', event => {
            event.preventDefault();
        });
        /**
         * Start listening if available from electron wrapper which
         */
        /*if (typeof require !== 'undefined') {
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
        }*/
    }

    test() {
        return this.dropped;
    }
}

export default DropWindow.getInstance();
