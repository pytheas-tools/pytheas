import { EVENTS } from '../../utils/events';
import { pubsub } from '../../utils/pubsub';

/**
 * Manage settings
 */
class SettingsManager {
    private static instance: SettingsManager;

    settings = {
        theme: 'theme-light'
    };

    private constructor() {}
    static getInstance() {
        if (!SettingsManager.instance) {
            SettingsManager.instance = new SettingsManager();
        }
        return SettingsManager.instance;
    }

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
