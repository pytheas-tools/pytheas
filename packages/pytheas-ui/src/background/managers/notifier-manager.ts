import notifier from 'notifier-js';

class NotifierSingleton {
    private static instance: NotifierSingleton;
    private constructor() {}
    static getInstance() {
        if (!NotifierSingleton.instance) {
            NotifierSingleton.instance = new NotifierSingleton();
        }
        return NotifierSingleton.instance;
    }

    info(message: string) {
        notifier.show('Information', message, 'info', '', 3000);
    }
}

export const NotifierManager = NotifierSingleton.getInstance();
