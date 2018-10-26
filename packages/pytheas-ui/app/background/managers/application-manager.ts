import CodeWindowManager from '../../windows/code-window';
import DropWindowManager from '../../windows/drop-window';
import GraphWindowManager from '../../windows/graph-window';
import NavigationBarManager from '../../windows/navigation-bar-manager';

import DataManager from '../data/data-manager';
import SettingsManager from './settings-manager';

import { pubsub } from '../../utils/pubsub';
import { EVENTS } from '../../utils/events';

/**
 * Manage all application state, main orchestrator
 */
class ApplicationManager {
    private static instance: ApplicationManager;
    private constructor() {}
    static getInstance() {
        if (!ApplicationManager.instance) {
            ApplicationManager.instance = new ApplicationManager();
        }
        return ApplicationManager.instance;
    }

    filesReady = false;

    init() {
        CodeWindowManager.init(document.querySelector('.code-window'));
        GraphWindowManager.init(document.querySelector('.graph-window'));
        NavigationBarManager.init(document.querySelector('py-navigation-bar'));
        DropWindowManager.init();
        SettingsManager.init();

        pubsub.subscribe(EVENTS.FILES_PARSED, parsedFiles => {
            this.filesReady = true;
            DataManager.init(parsedFiles);
            pubsub.publish(EVENTS.INIT_VIEW);
        });

        pubsub.subscribe(EVENTS.CODEBLOCK_STATEMENT_CLICKED, () => {
            console.log('ApplicationManager CODEBLOCK_STATEMENT_CLICKED notify everybody');
            this.onSomethingSelected();
        });

        pubsub.subscribe(EVENTS.GRAPH_ELEMENT_SELECTED, element => {
            console.log('ApplicationManager GRAPH_ELEMENT_SELECTED notify everybody');
            this.onSomethingSelected(element);
        });

        pubsub.subscribe(EVENTS.NAVIGATIONBAR_HOME, () => {
            if (!this.filesReady) return;
            console.log('ApplicationManager NAVIGATIONBAR_HOME notify everybody');
            pubsub.publish(EVENTS.INIT_VIEW);
        });
    }

    onSomethingSelected(element) {
        pubsub.publish(EVENTS.SOMETHING_SELECTED, element);
    }
}

export default ApplicationManager.getInstance();
