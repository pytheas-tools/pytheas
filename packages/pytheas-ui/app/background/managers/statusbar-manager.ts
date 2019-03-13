/**
 * Manage status bar
 */
class StatusbarManager {
    private static instance: StatusbarManager;

    $element: HTMLElement;

    private constructor() {}
    static getInstance() {
        if (!StatusbarManager.instance) {
            StatusbarManager.instance = new StatusbarManager();
        }
        return StatusbarManager.instance;
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

export default StatusbarManager.getInstance();
