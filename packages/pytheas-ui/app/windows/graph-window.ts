import domtoimage from 'dom-to-image';
import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../utils/events';

import Parser from '../background/files-parser';

class GraphWindow {
    $element: HTMLElement;

    $graphContainer: HTMLElement;

    $navigationBar: HTMLElement;

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

        this.initNavigationBar();

        pubsub.subscribe(EVENTS.FILES_PARSED, data => {
            const files = Parser.getParsedFiles();
            const $graphOverview = document.createElement('py-graph-overview');
            $graphOverview.data = {
                files: files.length
            };
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
    }

    initNavigationBar() {
        this.$navigationBar = this.$element.querySelector('py-navigation-bar');

        this.$navigationBar.addEventListener(EVENTS.NAVIGATIONBAR_BACK, () => {
            console.log('backEvent listener');
        });

        this.$navigationBar.addEventListener(EVENTS.NAVIGATIONBAR_HOME, () => {
            console.log('homeEvent listener');
        });

        this.$navigationBar.addEventListener(EVENTS.NAVIGATIONBAR_NEXT, () => {
            console.log('nextEvent listener');
        });
    }
}

export default GraphWindow.getInstance();
