import { defineCustomElements } from '../components/codeblock';
defineCustomElements(window);

import Split from 'split.js';
Split(['#three', '#four'], {
    sizes: [50, 50]
});
