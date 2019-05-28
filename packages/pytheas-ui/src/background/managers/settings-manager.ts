import { pubsub, EVENTS } from '../../utils';

/**
 * Manage settings
 */
class SettingsSingleton {
    private static instance: SettingsSingleton;

    settings = {
        theme: 'theme-light'
    };

    private constructor() {}
    static getInstance() {
        if (!SettingsSingleton.instance) {
            SettingsSingleton.instance = new SettingsSingleton();
        }
        return SettingsSingleton.instance;
    }

    init() {
        const $themeSelector = document.getElementById('theme-selector');
        $themeSelector.addEventListener('change', (ev: any) => {
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

export const SettingsManager = SettingsSingleton.getInstance();
