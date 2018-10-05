import domtoimage from 'dom-to-image';
import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../utils/events';

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

        pubsub.subscribe(EVENTS.FILES_PARSED, () => {
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
}

export default GraphWindow.getInstance();
