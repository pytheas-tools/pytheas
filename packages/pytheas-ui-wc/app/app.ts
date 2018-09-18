import { defineCustomElements } from '../components/codeblock';
defineCustomElements(window);

import Split from 'split.js';
Split(['.graph-window', '.code-window'], {
    sizes: [50, 50]
});
