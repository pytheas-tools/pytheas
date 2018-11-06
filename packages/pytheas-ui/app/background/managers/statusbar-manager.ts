import { pubsub } from '../../utils/pubsub';
import { EVENTS } from '../../utils/events';

/**
 * Manage settings
 */
class StatusbarManager {
    private static instance: StatusbarManager;
    private constructor() {}
    static getInstance() {
        if (!StatusbarManager.instance) {
            StatusbarManager.instance = new StatusbarManager();
        }
        return StatusbarManager.instance;
    }

    $element: HTMLElement;

    init() {
        this.$element = document.querySelector('.app-container__status-bar span');
    }

    displayMessage(message: string, permanent?: boolean) {
        if (this.$element) {
            this.$element.innerHTML = message;
            if (!permanent) {
                setTimeout(() => {
                    this.$element.innerHTML = '';
                }, 3000);
            }
        }
    }
}

export default StatusbarManager.getInstance();
