import notifier from 'notifier-js';

class Notifier {
    private static instance: Notifier;
    private constructor() {}
    static getInstance() {
        if (!Notifier.instance) {
            Notifier.instance = new Notifier();
        }
        return Notifier.instance;
    }

    info(message: string) {
        notifier.show('Information', message, 'info', '', 3000);
    }
}

export default Notifier.getInstance();
