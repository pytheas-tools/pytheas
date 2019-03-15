import ApplicationManager from './background/managers/application-manager';

ApplicationManager.init();

const { Split } = <any>window;

let $graph: any = null;

const syncGraphWithResize = () => {
    if (!$graph) {
        $graph = document.querySelector('py-graph');
    }
    if ($graph) {
        $graph.onExternalDragEvent();
    }
};

/**
 * Init split.js inside main window
 */
Split(['.graph-window', '.code-window'], {
    sizes: [50, 50],
    minSize: [700, 500],
    gutterSize: 5,
    onDrag: () => {
        syncGraphWithResize();
    }
});

window.addEventListener('resize', syncGraphWithResize, false);
