import { EVENTS } from '../utils/events';
import { pubsub } from '../utils/pubsub';

/**
 * Manage welcome window
 */
class WelcomeWindow {
    private static instance: WelcomeWindow;

    $element: HTMLElement;

    private constructor() {}
    static getInstance() {
        if (!WelcomeWindow.instance) {
            WelcomeWindow.instance = new WelcomeWindow();
        }
        return WelcomeWindow.instance;
    }

    init(element: HTMLElement) {
        this.$element = element;
        pubsub.subscribe(EVENTS.FILES_COMING, () => {
            this.hide();
        });
    }

    hide() {
        this.$element.style.display = 'none';
    }
}

export default WelcomeWindow.getInstance();
