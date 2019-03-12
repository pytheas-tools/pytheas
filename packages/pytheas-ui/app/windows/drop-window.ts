import { EventEmitter } from 'events';
import FilesParser from '../background/files-parser';
import FilesReader from '../background/files-reader';
import FilesScanner from '../background/files-scanner';
import DemosManager from '../background/managers/demos-manager';
import { EVENTS } from '../utils/events';
import { pubsub } from '../utils/pubsub';

interface ElectronEvent {
    sender: EventEmitter;
}

class DropWindow {
    private static instance: DropWindow;

    dropped = false;

    private constructor() {}
    static getInstance() {
        if (!DropWindow.instance) {
            DropWindow.instance = new DropWindow();
        }
        return DropWindow.instance;
    }

    init() {
        /**
         * Listen for browse input on welcome page
         */
        document.querySelector('#welcome-folder-selector').addEventListener('change', (ev: Event) => {
            pubsub.publish(EVENTS.FILES_COMING);
            FilesScanner.scanFilesFromBrowser(ev).then((scannedFiles: any[]) => {
                FilesReader.readFilesFromBrowser(scannedFiles).then(readedFiles => {
                    FilesParser.parseFiles(readedFiles).then(parsedFiles => {
                        pubsub.publish(EVENTS.FILES_PARSED, parsedFiles);
                    });
                });
            });
        });
        /**
         * Listen for select input on welcome page
         */
        document.querySelector('#demo-projects-selector').addEventListener('change', (ev: Event) => {
            pubsub.publish(EVENTS.FILES_COMING);
            const project = ev.target.value;
            DemosManager.getDemoProjectFiles(project).then(scannedFiles => {
                console.log(scannedFiles);
                FilesReader.readFilesFromFetchCall(scannedFiles).then(readedFiles => {
                    FilesParser.parseFiles(readedFiles).then(parsedFiles => {
                        pubsub.publish(EVENTS.FILES_PARSED, parsedFiles);
                    });
                });
            });
        });
        /**
         * Listen drop event, and manage files/folder dropped
         */
        document.addEventListener('drop', (ev: DragEvent) => {
            ev.preventDefault();
            this.dropped = true;
            pubsub.publish(EVENTS.FILES_COMING);
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
        if (typeof require !== 'undefined') {
            const ipc = require('electron').ipcRenderer;
            ipc.on('folder-selected', (event: ElectronEvent, path: string) => {
                FilesScanner.scanFilesFromElectron(path).then((scannedFiles: any[]) => {
                    FilesReader.readFilesFromElectron(scannedFiles).then(readedFiles => {
                        FilesParser.parseFiles(readedFiles).then(parsedFiles => {
                            pubsub.publish(EVENTS.FILES_PARSED, parsedFiles);
                        });
                    });
                });
            });
        }
    }

    test() {
        return this.dropped;
    }
}

export default DropWindow.getInstance();
