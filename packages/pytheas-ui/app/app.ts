import Split from 'split.js';

import { defineCustomElements } from '../components/codeblock';

import CodeWindowManager from './windows/code-window';
import DropWindowManager from './windows/drop-window';

import FilesScanner from './files-scanner';
import FilesReader from './files-reader';

/**
 * Init CodeBlock web component
 */
defineCustomElements(window);

/**
 * Init split.js inside main window
 */
Split(['.graph-window', '.code-window'], {
    sizes: [50, 50]
});

/**
 * Init right code window
 */
CodeWindowManager.init(document.querySelector('.code-window'));

/**
 * Init drop window
 */
DropWindowManager.init();

/**
 * Init files scanner
 */
FilesScanner.init();

/**
 * Init files reader
 */
FilesReader.init();