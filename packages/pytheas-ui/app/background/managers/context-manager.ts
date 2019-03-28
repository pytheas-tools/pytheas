import { pubsub, EVENTS } from '../../utils';

/**
 * Manage application context execution
 */
class ContextSingleton {
    private static instance: ContextSingleton;

    current_context: string;

    private constructor() {}
    static getInstance() {
        if (!ContextSingleton.instance) {
            ContextSingleton.instance = new ContextSingleton();
        }
        return ContextSingleton.instance;
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

export const ContextManager = ContextSingleton.getInstance();
