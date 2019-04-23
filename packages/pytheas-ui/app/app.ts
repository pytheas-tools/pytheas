import { ApplicationManager } from './background/managers';

import Split from 'split.js';

ApplicationManager.init();

/**
 * Init split.js inside main window
 */
Split(['.graph-window', '.code-window'], {
    sizes: [50, 50],
    minSize: [700, 500],
    gutterSize: 5
});
