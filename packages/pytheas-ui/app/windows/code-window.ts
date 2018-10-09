import { format } from 'date-fns';

import { pubsub } from '../utils/pubsub';
import { EVENTS } from '../utils/events';

import Parser from '../background/files-parser';

/**
 * Manage code window, display and instanciate codeblock WCs with informations from application manager.
 * Proxy events from codeblocks for AM
 */
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
        pubsub.subscribe(EVENTS.INIT_VIEW, () => {
            this.clearWindow();
            this.displayInitialParsingInformations();
        });
        pubsub.subscribe(EVENTS.SOMETHING_SELECTED, () => {
            console.log('CodeWindow something selected, display related blocks');
            this.clearWindow();
        });
    }

    displayInitialParsingInformations() {
        let lines = 0;
        const files = Parser.getParsedFiles();
        files.forEach(file => {
            lines += file.sloc.total;
        });
        const $codeBlock = document.createElement('py-codeblock');
        $codeBlock.setAttribute('filename', 'Last scan');
        $codeBlock.setAttribute(
            'code',
            `last indexed: ${format(new Date(), 'dd-MM-YYYY HH:mm:ss')}

${files.length} files
${lines} lines of code
`
        );

        $codeBlock.addEventListener(EVENTS.CODEBLOCK_MAXIMIZED, this.onCodeblockMaximized.bind(this));
        $codeBlock.addEventListener(EVENTS.CODEBLOCK_UNMAXIMIZED, this.onCodeblockUnmaximized.bind(this));
        $codeBlock.addEventListener(EVENTS.CODEBLOCK_STATEMENT_CLICKED, this.onCodeblockStatementClicked.bind(this));

        this.$element.appendChild($codeBlock);
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

    onCodeblockStatementClicked(ev) {
        console.log('onCodeblockStatementClicked: ', ev);
        pubsub.publish(EVENTS.CODEBLOCK_STATEMENT_CLICKED);
    }
}

export default CodeWindow.getInstance();
