import Split from 'split.js';

import ApplicationManager from './background/application-manager/application-manager';

ApplicationManager.init();

/**
 * Init split.js inside main window
 */
Split(['.graph-window', '.code-window'], {
    sizes: [50, 50],
    gutterSize: 5
});
