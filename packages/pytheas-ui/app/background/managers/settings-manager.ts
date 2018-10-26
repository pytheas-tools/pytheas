import { pubsub } from '../../utils/pubsub';
import { EVENTS } from '../../utils/events';

/**
 * Manage all application state, main orchestrator
 */
class SettingsManager {
    private static instance: SettingsManager;
    private constructor() {}
    static getInstance() {
        if (!SettingsManager.instance) {
            SettingsManager.instance = new SettingsManager();
        }
        return SettingsManager.instance;
    }

    settings = {
        theme: 'theme-dark'
    };

    init() {
        const $themeSelector = document.getElementById('theme-selector');
        $themeSelector.addEventListener('change', ev => {
            const selectedTheme = ev.target.value;
            this.settings.theme = selectedTheme;
            pubsub.publish(EVENTS.THEME_CHANGED, selectedTheme);
            document.querySelector('body').classList.remove('theme-dark');
            document.querySelector('body').classList.remove('theme-light');
            document.querySelector('body').classList.add(selectedTheme);
        });
    }

    getSettings() {
        return this.settings;
    }
}

export default SettingsManager.getInstance();
