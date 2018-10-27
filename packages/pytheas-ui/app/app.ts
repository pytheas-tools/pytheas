import Split from 'split.js';

import ApplicationManager from './background/managers/application-manager';
import { Graph } from '../components/dist/types/components/graph/graph';

ApplicationManager.init();

/**
 * Init split.js inside main window
 */
Split(['.graph-window', '.code-window'], {
    sizes: [50, 50],
    gutterSize: 5,
    onDrag: () => {
        syncGraphWithResize();
    }
});

let $graph: Graph = null;

const syncGraphWithResize = () => {
    if (!$graph) {
        $graph = document.querySelector('py-graph');
    }
    if ($graph) {
        $graph.onExternalDragEvent();
    }
};

window.addEventListener('resize', syncGraphWithResize, false);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js');
    });
}
