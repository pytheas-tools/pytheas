import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../events';

import Parser from '../files-parser';

class CodeWindow {
    $element: HTMLElement;

    private static instance: CodeWindow;
    private constructor() {}
    static getInstance() {
        if (!CodeWindow.instance) {
            CodeWindow.instance = new CodeWindow();
        }
        return CodeWindow.instance;
    }
    init(element: HTMLElement) {
        this.$element = element;
        pubsub.subscribe(EVENTS.FILES_PARSED, () => {
            this.clearWindow();
            const files = Parser.getReadedFiles();
            files.forEach(file => {
                let $codeBlock = document.createElement('py-codeblock');
                $codeBlock.setAttribute('filename', file.name);
                $codeBlock.setAttribute('code', file.sourcecode);
                this.$element.appendChild($codeBlock);
            });
        });
    }

    clearWindow() {
        while (this.$element.firstChild) {
            this.$element.firstChild.remove();
        }
    }
}

export default CodeWindow.getInstance();
