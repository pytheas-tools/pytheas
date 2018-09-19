import { defineCustomElements } from '../components/codeblock';
defineCustomElements(window);

import Split from 'split.js';
Split(['.graph-window', '.code-window'], {
    sizes: [50, 50]
});

import CodeWindowManager from './windows/code-window';

CodeWindowManager.init(document.getElementsByTagName('py-codeblock')[0]);
