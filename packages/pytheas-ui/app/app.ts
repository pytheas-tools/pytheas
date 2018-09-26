// import Split from 'split.js';

import { defineCustomElements } from '../components/codeblock/dist/loader';

import { defineCustomElements as defineCodeSplit } from '../../../../split-me';

import CodeWindowManager from './windows/code-window';
import DropWindowManager from './windows/drop-window';

/**
 * Init CodeBlock web component
 */
defineCustomElements(window);
defineCodeSplit(window);

/**
 * Init split.js inside main window
 */
/*Split(['.graph-window', '.code-window'], {
    sizes: [50, 50]
});*/

/**
 * Init right code window
 */
CodeWindowManager.init(document.querySelector('.code-window'));

/**
 * Init drop window
 */
DropWindowManager.init();
