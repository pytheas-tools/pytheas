import dayjs from 'dayjs';

import { pubsub, EVENTS } from '../utils';

import { FilesParser } from '../background/files';
import { SettingsManager } from '../background/managers/settings-manager';

/**
 * Manage code window, display and instanciate codeblock WCs with informations from application manager.
 * Proxy events from codeblocks for AM
 */
class CodeWindow {
    private static instance: CodeWindow;

    $element: HTMLElement;

    lastScrollPosition = 0;

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
        pubsub.subscribe(EVENTS.SOMETHING_SELECTED, selectedElement => {
            // console.log('CodeWindow something selected, display related blocks: ', selectedElement);
            this.clearWindow();
            this.addCodeBlock(selectedElement.file);
            selectedElement.getInRelations().forEach((relation: any) => {
                this.addCodeBlock(relation.from.file);
            });
        });
        pubsub.subscribe(EVENTS.THEME_CHANGED, theme => {
            const codeBlocks = document.querySelectorAll('py-codeblock-rennesjs');
            codeBlocks.forEach((codeBlock: any) => {
                codeBlock.updateTheme(theme);
            });
        });
        pubsub.subscribe(EVENTS.NAVIGATIONBAR_ONUPDATE, item => {
            // console.log('CodeWindow NAVIGATIONBAR_ONUPDATE: ', item);

            if (item && item.type === 'overview') {
                this.clearWindow();
            }
        });
    }

    displayInitialParsingInformations() {
        let lines = 0;
        const files = FilesParser.getParsedFiles();
        files.forEach((file: any) => {
            lines += file.sloc.total;
        });
        this.addCodeBlock({
            name: 'Last scan',
            sourcecode: `Last indexed: ${dayjs().format('DD-MM-YYYY HH:mm:ss')}

${files.length} files

${lines} lines of code`
        });
    }

    addCodeBlock(file: any) {
        const $codeBlock = document.createElement('py-codeblock');

        $codeBlock.setAttribute('filename', file.name);
        $codeBlock.setAttribute('code', file.sourcecode);
        $codeBlock.setAttribute('language', file.language);
        $codeBlock.setAttribute('codemirror-path', 'scripts/codemirror.js');
        $codeBlock.setAttribute('theme', SettingsManager.getSettings().theme);

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

    onCodeblockStatementClicked(ev: Event) {
        // console.log('onCodeblockStatementClicked: ', ev);
        pubsub.publish(EVENTS.CODEBLOCK_STATEMENT_CLICKED);
    }
}

export const CodeWindowManager = CodeWindow.getInstance();
