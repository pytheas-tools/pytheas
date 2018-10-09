import CodeWindowManager from '../../windows/code-window';
import DropWindowManager from '../../windows/drop-window';
import GraphWindowManager from '../../windows/graph-window';

/**
 * Manage all application state, main orchestrator
 */
class applicationManager {
    private static instance: applicationManager;
    private constructor() {}
    static getInstance() {
        if (!applicationManager.instance) {
            applicationManager.instance = new applicationManager();
        }
        return applicationManager.instance;
    }

    init() {
        /**
         * Init right code window
         */
        CodeWindowManager.init(document.querySelector('.code-window'));

        /**
         * Init left code window
         */
        GraphWindowManager.init(document.querySelector('.graph-window'));

        /**
         * Init drop window
         */
        DropWindowManager.init();
    }
}

export default applicationManager.getInstance();
