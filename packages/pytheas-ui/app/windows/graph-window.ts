import domtoimage from 'dom-to-image';
import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../utils/events';

import DataManager from '../background/data/data-manager';

/**
 * Manage graph window, display and instanciate a graph WC with informations from application manager.
 * Proxy events from graph for AM
 */
class GraphWindow {
    $element: HTMLElement;

    $graphContainer: HTMLElement;

    private static instance: GraphWindow;
    private constructor() {}
    static getInstance() {
        if (!GraphWindow.instance) {
            GraphWindow.instance = new GraphWindow();
        }
        return GraphWindow.instance;
    }

    init(element: HTMLElement) {
        this.$element = element;
        this.$graphContainer = element.querySelector('.graph-container');

        pubsub.subscribe(EVENTS.INIT_VIEW, data => {
            const $graphOverview = document.createElement('py-graph-overview');
            $graphOverview.data = { file: DataManager.getFiles(), class: DataManager.getClasses(), function: DataManager.getFunctions() };
            $graphOverview.addEventListener(EVENTS.GRAPH_ELEMENT_CLICKED, this.onGraphElementClicked.bind(this));
            this.$graphContainer.appendChild($graphOverview);
            /*const node = document.querySelector('py-navigation-bar');
            domtoimage
                .toPng(node)
                .then((dataUrl: string) => {
                    const img = new Image();
                    console.log(dataUrl);

                    img.src = dataUrl;
                    this.$graphContainer.appendChild(img);
                })
                .catch((error: string) => {
                    console.error('oops, something went wrong!', error);
                });*/
        });

        pubsub.subscribe(EVENTS.SOMETHING_SELECTED, () => {
            console.log('GraphWindow something selected, display graph');
        });
    }

    onGraphElementClicked(ev) {
        console.log('onGraphElementClicked: ', ev);
        pubsub.publish(EVENTS.GRAPH_ELEMENT_CLICKED);
    }
}

export default GraphWindow.getInstance();
