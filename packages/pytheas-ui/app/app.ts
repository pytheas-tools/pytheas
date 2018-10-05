import Split from 'split.js';

import CodeWindowManager from './windows/code-window';
import DropWindowManager from './windows/drop-window';
import GraphWindowManager from './windows/graph-window';

/**
 * Init right code window
 */
CodeWindowManager.init(document.querySelector('.code-window'));

/**
 * Init left code window
 */
GraphWindowManager.init(document.querySelector('.graph-window'));

/**
 * Init drop window
 */
DropWindowManager.init();

/**
 * Init split.js inside main window
 */
Split(['.graph-window', '.code-window'], {
    sizes: [50, 50],
    gutterSize: 5
});
