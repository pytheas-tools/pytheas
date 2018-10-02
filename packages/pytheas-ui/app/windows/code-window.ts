import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../events';

import Parser from '../files-parser';

class CodeWindow {
    $element: HTMLElement;

    lastScrollPosition = 0;

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
            const files = Parser.getParsedFiles();
            files.forEach(file => {
                let $codeBlock = document.createElement('py-codeblock');
                $codeBlock.setAttribute('filename', file.name);
                $codeBlock.setAttribute('code', file.sourcecode);
                $codeBlock.addEventListener(EVENTS.CODEBLOCK_MAXIMIZED, this.onCodeblockMaximized.bind(this));
                $codeBlock.addEventListener(EVENTS.CODEBLOCK_UNMAXIMIZED, this.onCodeblockUnmaximized.bind(this));
                this.$element.appendChild($codeBlock);
            });
        });
    }

    clearWindow() {
        while (this.$element.firstChild) {
            this.$element.firstChild.remove();
        }
    }

    onCodeblockMaximized() {
        this.$element.classList.add('codeblock-maximized');
        this.lastScrollPosition = this.$element.scrollTop;
        this.$element.scrollTop = 0;
    }

    onCodeblockUnmaximized() {
        this.$element.classList.remove('codeblock-maximized');
        this.$element.scrollTop = this.lastScrollPosition;
    }
}

export default CodeWindow.getInstance();
