import domtoimage from 'dom-to-image';
import downloadjs from 'downloadjs';
import panzoom from 'panzoom';

import { pubsub, EVENTS } from '../utils';

import { DataManager } from '../background/data/data-manager';
import { ContextmenuManager } from '../background/managers/contextmenu-manager';

/**
 * Manage graph window, display and instanciate a graph WC with informations from application manager.
 * Proxy events from graph for AM
 */
class GraphWindow {
    private static instance: GraphWindow;

    $element: HTMLElement;

    $graphContainer: HTMLElement;
    $graphContainerZoomable: HTMLElement;
    $graph: any; // HTMLPyGraphElement
    $graphOverview: any; // HTMLPyGraphOverviewElement

    panZoomInstance: any;
    panZoomMessage: HTMLElement;

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
            this.resetWindow();
            this.displayInitView();
        });

        pubsub.subscribe(EVENTS.SAVEGRAPHASIMAGE, () => {
            this.saveasimage();
        });

        pubsub.subscribe(EVENTS.SOMETHING_SELECTED, selectedElement => {
            // console.log('GraphWindow something selected, display graph: ', selectedElement);
            this.resetWindow();
            this.addGraph(selectedElement);
            ContextmenuManager.updateHost();
        });

        pubsub.subscribe(EVENTS.NAVIGATIONBAR_ONUPDATE, item => {
            // console.log('GraphWindow NAVIGATIONBAR_ONUPDATE: ', item);

            if (item) {
                if (item.type === 'overview' && !item.subtype) {
                    this.resetWindow();
                    this.displayInitView();
                } else if (item.type === 'overview' && item.subtype) {
                    if (this.$graphOverview) {
                        this.$graphOverview.selectType(item.subtype, false);
                    }
                }
            }
        });
    }

    resetWindow() {
        this.clearWindow();
        if (this.panZoomInstance) {
            this.panZoomInstance.dispose();
        }
        this.initPanzoom();
    }

    saveasimage() {
        const node = document.querySelector('.graph-container__zoomable');
        domtoimage
            .toPng(node)
            .then((dataUrl: string) => {
                downloadjs(dataUrl, 'my-image.png', 'image/png');
            })
            .catch((error: string) => {
                console.error('oops, something went wrong!', error);
            });
    }

    initPanzoom() {
        const zoomPlusButton: any = document.querySelectorAll('.graph-controls__buttons button')[0];
        const zoomMinButton: any = document.querySelectorAll('.graph-controls__buttons button')[1];
        try {
            this.panZoomInstance = panzoom(this.$graphContainerZoomable, {
                maxZoom: 1.25,
                minZoom: 0.25
            });
            this.panZoomMessage = document.querySelector('.graph-controls_level-message');
            zoomPlusButton.addEventListener('click', () => {
                const e: any = document.createEvent('HTMLEvents');
                e.keyCode = 107;
                e.initEvent('keydown', false, true);
                this.$graphContainer.dispatchEvent(e);
                this.displayZoomLevel();
            });
            zoomMinButton.addEventListener('click', () => {
                const e: any = document.createEvent('HTMLEvents');
                e.keyCode = 109;
                e.initEvent('keydown', false, true);
                this.$graphContainer.dispatchEvent(e);
                this.displayZoomLevel();
            });
        } catch (e) {
            // If issue in electron
            zoomPlusButton.style.display = 'none';
            zoomMinButton.style.display = 'none';
        }
    }

    displayZoomLevel() {
        const scale = Math.ceil(this.panZoomInstance.getTransform().scale * 100);
        this.panZoomMessage.style.display = 'block';
        this.panZoomMessage.innerHTML = `${scale}%`;
        setTimeout(() => {
            this.panZoomMessage.style.display = 'none';
        }, 2000);
    }

    addGraph(element: any) {
        this.$graph = document.createElement('py-graph');
        this.$graph.setAttribute('mxclient-path', 'scripts/mxgraph');
        this.$graph.data = element;
        this.$graph.addEventListener(EVENTS.GRAPH_ELEMENT_SELECTED, this.onGraphElementSelected.bind(this));
        this.$graph.addEventListener(EVENTS.GRAPH_SUBELEMENT_SELECTED, this.onGraphSubElementSelected.bind(this));
        this.$graphContainerZoomable.appendChild(this.$graph);
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

    onGraphOverviewDetailSelected(ev: any) {
        // console.log('onGraphOverviewDetailSelected: ', ev.detail);
        pubsub.publish(EVENTS.GRAPH_OVERVIEW_DETAIL_SELECTED, ev.detail);
    }

    onGraphSubElementSelected(ev: any) {
        console.log('onGraphSubElementSelected: ', ev.detail);
    }

    onGraphElementSelected(ev: any) {
        console.log('onGraphElementClicked: ', ev.detail);
        pubsub.publish(EVENTS.GRAPH_ELEMENT_SELECTED, ev.detail);
    }
}

export const GraphWindowManager = GraphWindow.getInstance();
