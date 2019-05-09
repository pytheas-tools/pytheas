/**
 * Manage status bar
 */
class StatusbarSingleton {
    private static instance: StatusbarSingleton;

    $element: HTMLElement;

    private constructor() {}
    static getInstance() {
        if (!StatusbarSingleton.instance) {
            StatusbarSingleton.instance = new StatusbarSingleton();
        }
        return StatusbarSingleton.instance;
    }

    init() {
        this.$element = document.querySelector('.app-container__status-bar div');
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

export const StatusbarManager = StatusbarSingleton.getInstance();
