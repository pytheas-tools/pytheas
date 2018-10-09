import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../utils/events';

/**
 * Manage navigation bar, display informations from application manager.
 * Proxy events from NB for AM
 */
class NavigationBar {
    $element: HTMLElement;

    private static instance: NavigationBar;
    private constructor() {}
    static getInstance() {
        if (!NavigationBar.instance) {
            NavigationBar.instance = new NavigationBar();
        }
        return NavigationBar.instance;
    }

    init(element: HTMLElement) {
        this.$element = element;
        this.initListeners();
    }

    initListeners() {
        this.$element.addEventListener(EVENTS.NAVIGATIONBAR_BACK, () => {
            console.log('backEvent listener');
        });

        this.$element.addEventListener(EVENTS.NAVIGATIONBAR_HOME, () => {
            console.log('homeEvent listener');
        });

        this.$element.addEventListener(EVENTS.NAVIGATIONBAR_NEXT, () => {
            console.log('nextEvent listener');
        });
    }
}

export default NavigationBar.getInstance();
