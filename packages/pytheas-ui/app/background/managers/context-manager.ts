import { EVENTS } from '../../utils/events';
import { pubsub } from '../../utils/pubsub';

/**
 * Manage application context execution
 */
class ContextManager {
    private static instance: ContextManager;

    current_context: string;

    private constructor() {}
    static getInstance() {
        if (!ContextManager.instance) {
            ContextManager.instance = new ContextManager();
        }
        return ContextManager.instance;
    }

    init() {
        const { PYTHEAS_CONTEXT } = <any>window;
        this.current_context = PYTHEAS_CONTEXT;

        if (this.current_context && this.current_context === 'vscode') {
            // Manage VSCode Theme
            const body = document.querySelector('body');
            const hasDarkTheme = body.classList.contains('vscode-dark');
            const hasLightTheme = body.classList.contains('vscode-light');
            if (hasDarkTheme) {
                pubsub.publish(EVENTS.THEME_CHANGED, 'theme-dark');
            }
            if (hasLightTheme) {
                pubsub.publish(EVENTS.THEME_CHANGED, 'theme-light');
            }
        }
    }
}

export default ContextManager.getInstance();
