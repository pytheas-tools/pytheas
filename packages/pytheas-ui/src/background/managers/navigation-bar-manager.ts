import { pubsub, EVENTS } from '../../utils';

/**
 * Manage navigation bar, display informations from application manager.
 * Proxy events from NB for AM
 */
class NavigationBar {
    private static instance: NavigationBar;

    $element: HTMLElement;

    history: any;
    historyIndex = 0;

    private constructor() {}
    static getInstance() {
        if (!NavigationBar.instance) {
            NavigationBar.instance = new NavigationBar();
        }
        return NavigationBar.instance;
    }

    init(element: HTMLElement) {
        this.$element = element;
        this.initListeners();
    }

    initListeners() {
        this.$element.addEventListener(EVENTS.NAVIGATIONBAR_BACK, () => {
            // console.log('backEvent listener: ', this);
            pubsub.publish(EVENTS.NAVIGATIONBAR_BACK);
            if (this.canGoBack()) {
                const item = this.history[--this.historyIndex];
                this.onUpdate(item);
                this.manageButtonsStates();
            }
        });

        this.$element.addEventListener(EVENTS.NAVIGATIONBAR_HOME, () => {
            // console.log('homeEvent listener');
            pubsub.publish(EVENTS.NAVIGATIONBAR_HOME);
        });

        this.$element.addEventListener(EVENTS.NAVIGATIONBAR_NEXT, () => {
            // console.log('nextEvent listener');
            pubsub.publish(EVENTS.NAVIGATIONBAR_NEXT);
            if (this.canGoNext()) {
                const item = this.history[++this.historyIndex];
                this.onUpdate(item);
                this.manageButtonsStates();
            }
        });

        pubsub.subscribe(EVENTS.GRAPH_OVERVIEW_DETAIL_SELECTED, type => {
            // console.log('NavigationBar GRAPH_OVERVIEW_DETAIL_SELECTED: ', this);
            this.history.push({
                type: 'overview',
                subtype: type
            });
            this.historyIndex++;
            this.$element.setAttribute('back-disabled', 'false');
            // console.log(this);
        });

        pubsub.subscribe(EVENTS.SOMETHING_SELECTED, () => {
            // console.log('NavigationBar something selected, update bar value');
        });

        pubsub.subscribe(EVENTS.INIT_VIEW, () => {
            // console.log('NavigationBar init view');
            this.$element.setAttribute('current', 'Overview');
            this.$element.setAttribute('back-disabled', 'true');
            this.$element.setAttribute('next-disabled', 'true');
            this.history = [
                {
                    type: 'overview'
                }
            ];
            this.historyIndex = 0;
        });
    }

    onUpdate(item: any) {
        pubsub.publish(EVENTS.NAVIGATIONBAR_ONUPDATE, item);
    }

    manageButtonsStates() {
        if (this.historyIndex === 0 && this.count() > 0) {
            this.$element.setAttribute('back-disabled', 'true');
            this.$element.setAttribute('next-disabled', 'false');
        } else if (this.historyIndex === this.count()) {
            this.$element.setAttribute('back-disabled', 'false');
            this.$element.setAttribute('next-disabled', 'true');
        }
    }

    canGoBack() {
        return this.historyIndex > 0;
    }

    canGoNext() {
        return this.historyIndex < this.count();
    }

    count() {
        return this.history.length - 1;
    }
}

export const NavigationBarManager = NavigationBar.getInstance();
