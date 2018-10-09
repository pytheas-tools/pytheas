import CodeWindowManager from '../../windows/code-window';
import DropWindowManager from '../../windows/drop-window';
import GraphWindowManager from '../../windows/graph-window';
import NavigationBarManager from '../../windows/navigation-bar-manager';
import { pubsub } from '../../utils/pubsub';
import { EVENTS } from '../../utils/events';

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

        pubsub.subscribe(EVENTS.CODEBLOCK_STATEMENT_CLICKED, () => {
            console.log('applicationManager CODEBLOCK_STATEMENT_CLICKED notify everybody');
        });

        pubsub.subscribe(EVENTS.GRAPH_ELEMENT_CLICKED, () => {
            console.log('applicationManager GRAPH_ELEMENT_CLICKED notify everybody');
        });

        pubsub.subscribe(EVENTS.NAVIGATIONBAR_BACK, () => {
            console.log('applicationManager NAVIGATIONBAR_BACK notify everybody');
        });
        pubsub.subscribe(EVENTS.NAVIGATIONBAR_HOME, () => {
            console.log('applicationManager NAVIGATIONBAR_HOME notify everybody');
        });
        pubsub.subscribe(EVENTS.NAVIGATIONBAR_NEXT, () => {
            console.log('applicationManager NAVIGATIONBAR_NEXT notify everybody');
        });
    }

    onSomethingSelected() {
        pubsub.publish(EVENTS.SOMETHING_SELECTED);
    }
}

export default applicationManager.getInstance();
