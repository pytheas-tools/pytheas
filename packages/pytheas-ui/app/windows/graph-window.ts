import domtoimage from 'dom-to-image';
import panzoom from 'panzoom';

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
    $graphContainerZoomable: HTMLElement;

    panZoomInstance;
    panZoomMessage: HTMLElement;

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
        this.$graphContainerZoomable = element.querySelector('.graph-container__zoomable');

        this.initPanzoom();

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

    initPanzoom() {
        this.panZoomInstance = panzoom(this.$graphContainerZoomable, {
            maxZoom: 1.25,
            minZoom: 0.25
        });
        this.panZoomMessage = document.querySelector('.graph-controls_level-message');
        const zoomPlusButton = document.querySelectorAll('.graph-controls__buttons button')[0];
        const zoomMinButton = document.querySelectorAll('.graph-controls__buttons button')[1];
        zoomPlusButton.addEventListener('click', () => {
            const e = document.createEvent('HTMLEvents');
            e.keyCode = 107;
            e.initEvent('keydown', false, true);
            this.$graphContainer.dispatchEvent(e);
            this.displayZoomLevel();
        });
        zoomMinButton.addEventListener('click', () => {
            const e = document.createEvent('HTMLEvents');
            e.keyCode = 109;
            e.initEvent('keydown', false, true);
            this.$graphContainer.dispatchEvent(e);
            this.displayZoomLevel();
        });
    }

    displayZoomLevel() {
        let scale = Math.ceil(this.panZoomInstance.getTransform().scale * 100);
        this.panZoomMessage.style.display = 'block';
        this.panZoomMessage.innerHTML = `${scale}%`;
        const pygraph = document.querySelector('py-graph');
        if (pygraph) {
            pygraph.getJsPlumbInstance().then(instance => {
                setTimeout(() => {
                    instance.repaintEverything();
                }, 0);
            });
        }
        setTimeout(() => {
            this.panZoomMessage.style.display = 'none';
        }, 2000);
    }

    addGraph(element) {
        const $graph = document.createElement('py-graph');
        $graph.data = element;
        this.$graphContainerZoomable.appendChild($graph);
    }

    clearWindow() {
        while (this.$graphContainerZoomable.firstChild) {
            this.$graphContainerZoomable.firstChild.remove();
        }
    }

    displayInitView() {
        this.$graphOverview = document.createElement('py-graph-overview');
        this.$graphOverview.data = { file: DataManager.getFiles(), class: DataManager.getClasses(), function: DataManager.getFunctions() };

        this.$graphOverview.addEventListener(EVENTS.GRAPH_ELEMENT_SELECTED, this.onGraphElementSelected.bind(this));
        this.$graphOverview.addEventListener(EVENTS.GRAPH_OVERVIEW_DETAIL_SELECTED, this.onGraphOverviewDetailSelected.bind(this));

        this.$graphContainerZoomable.appendChild(this.$graphOverview);
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
