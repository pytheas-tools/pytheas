// import Split from 'split.js';

import ApplicationManager from './background/managers/application-manager';
import { Graph } from '../components/dist/types/components/graph/graph';

ApplicationManager.init();

/**
 * Init split.js inside main window
 */
(<any>window).Split(['.graph-window', '.code-window'], {
    sizes: [50, 50],
    gutterSize: 5,
    onDrag: () => {
        syncGraphWithResize();
    }
});

let $graph: any = null;

const syncGraphWithResize = () => {
    if (!$graph) {
        $graph = document.querySelector('py-graph');
    }
    if ($graph) {
        $graph.onExternalDragEvent();
    }
};

window.addEventListener('resize', syncGraphWithResize, false);
