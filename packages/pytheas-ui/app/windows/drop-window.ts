import FilesScanner from '../files-scanner';

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
            FilesScanner.scanFilesFromBrowser(ev);
        });
        /**
         * Listen dragover event and cancel it to dispatch drop event
         */
        document.addEventListener('dragover', () => {
            event.preventDefault();
        });
    }
}

export default DropWindow.getInstance();
