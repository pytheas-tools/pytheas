import CodeWindowManager from '../../windows/code-window';
import DropWindowManager from '../../windows/drop-window';
import GraphWindowManager from '../../windows/graph-window';
import NavigationBarManager from '../../windows/navigation-bar-manager';

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

    visitedItems;

    init() {
        CodeWindowManager.init(document.querySelector('.code-window'));
        GraphWindowManager.init(document.querySelector('.graph-window'));
        DropWindowManager.init();
        NavigationBarManager.init(document.querySelector('py-navigation-bar'));
    }
}

export default applicationManager.getInstance();
