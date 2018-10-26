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
    $graphOverview: HTMLElement;

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
            this.clearWindow();
            this.displayInitView();
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

        pubsub.subscribe(EVENTS.SOMETHING_SELECTED, selectedElement => {
            console.log('GraphWindow something selected, display graph: ', selectedElement);
            this.clearWindow();
            this.addGraph(selectedElement);
        });

        pubsub.subscribe(EVENTS.NAVIGATIONBAR_ONUPDATE, item => {
            console.log('NAVIGATIONBAR_ONUPDATE: ', item);

            if (item) {
                if (item.type === 'overview' && !item.subtype) {
                    this.clearWindow();
                    this.displayInitView();
                } else if (item.type === 'overview' && item.subtype) {
                    if (this.$graphOverview) {
                        this.$graphOverview.selectType(item.subtype, false);
                    }
                }
            }
        });
    }

    addGraph(element) {
        const $graph = document.createElement('py-graph');
        $graph.data = element;
        this.$graphContainer.appendChild($graph);
    }

    clearWindow() {
        while (this.$graphContainer.firstChild) {
            this.$graphContainer.firstChild.remove();
        }
    }

    displayInitView() {
        this.$graphOverview = document.createElement('py-graph-overview');
        this.$graphOverview.data = { file: DataManager.getFiles(), class: DataManager.getClasses(), function: DataManager.getFunctions() };

        this.$graphOverview.addEventListener(EVENTS.GRAPH_ELEMENT_SELECTED, this.onGraphElementSelected.bind(this));
        this.$graphOverview.addEventListener(EVENTS.GRAPH_OVERVIEW_DETAIL_SELECTED, this.onGraphOverviewDetailSelected.bind(this));

        this.$graphContainer.appendChild(this.$graphOverview);
    }

    onGraphOverviewDetailSelected(ev) {
        console.log('onGraphOverviewDetailSelected: ', ev.detail);
        pubsub.publish(EVENTS.GRAPH_OVERVIEW_DETAIL_SELECTED, ev.detail);
    }

    onGraphElementSelected(ev) {
        console.log('onGraphElementClicked: ', ev.detail);
        pubsub.publish(EVENTS.GRAPH_ELEMENT_SELECTED, ev.detail);
    }
}

export default GraphWindow.getInstance();
