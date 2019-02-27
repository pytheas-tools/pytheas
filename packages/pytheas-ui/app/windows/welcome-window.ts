import dayjs from 'dayjs';

import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../utils/events';

import Parser from '../background/files-parser';
import SettingsManager from '../background/managers/settings-manager';

/**
 * Manage welcome window
 */
class WelcomeWindow {
    $element: HTMLElement;

    private static instance: WelcomeWindow;
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
