import { Component, Prop, Element, Event, EventEmitter, Method } from '@stencil/core';

@Component({
    tag: 'py-codeblock',
    styleUrl: 'codeblock.scss'
})
export class CodeBlock {
    @Prop()
    code: string;
    @Prop()
    filename: string;
    @Prop()
    theme: string;

    maximized = false;
    codeMirrorEditor;

    @Event()
    codeblockMaximized: EventEmitter;
    @Event()
    codeblockUnmaximized: EventEmitter;

    @Element()
    el: HTMLElement;

    reduceButton: HTMLButtonElement;
    openButton: HTMLButtonElement;
    fullsizeButton: HTMLButtonElement;

    topBar: HTMLElement;
    codeView: HTMLElement;

    componentWillLoad() {
        // console.log('CodeBlock is about to be rendered..');
    }

    componentDidLoad() {
        // console.log('CodeBlock is rendered..');
        if (window['CodeMirror']) {
            this.codeMirrorEditor = window['CodeMirror'](this.el.querySelector('.py-codeblock__code-view'), {
                value: this.code,
                mode: 'javascript',
                lineNumbers: true,
                viewportMargin: Infinity,
                lineWrapping: true,
                foldGutter: true,
                theme: this.theme && this.theme === 'theme-dark' ? 'monokai' : 'default',
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
            });
        }
        this.topBar = this.el.querySelector('.py-codeblock__top-bar');
        this.codeView = this.el.querySelector('.py-codeblock__code-view');

        this.reduceButton = this.el.querySelector('.button.reduce');

        this.openButton = this.el.querySelector('.button.open');
        this.openButton.classList.add('disabled');

        this.fullsizeButton = this.el.querySelector('.button.maximize');
    }

    @Method()
    updateTheme(theme: string) {
        const localTheme = theme === 'theme-dark' ? 'monokai' : 'default';
        this.codeMirrorEditor.setOption('theme', localTheme);
    }

    reduce() {
        this.codeView.classList.add('reduced');
        this.topBar.classList.add('reduced');

        this.reduceButton.classList.add('disabled');
        this.openButton.classList.remove('disabled');
    }

    open() {
        if (this.maximized) {
            this.el.classList.remove('maximize');
            this.openButton.classList.add('disabled');
            this.reduceButton.style.display = 'inline-block';
            this.fullsizeButton.style.display = 'inline-block';
            this.maximized = false;
            this.codeblockUnmaximized.emit();
        } else {
            this.codeView.classList.remove('reduced');
            this.topBar.classList.remove('reduced');

            this.reduceButton.classList.remove('disabled');
            this.openButton.classList.add('disabled');
        }
    }

    maximize() {
        this.el.classList.add('maximize');
        this.reduceButton.style.display = 'none';
        this.fullsizeButton.style.display = 'none';
        this.reduceButton.classList.remove('disabled');
        this.openButton.classList.remove('disabled');
        this.topBar.classList.remove('reduced');
        this.codeView.classList.remove('reduced');
        this.maximized = true;
        this.codeblockMaximized.emit();
    }

    render() {
        // console.log('CodeBlock rendering..');
        return (
            <div>
                <div class="py-codeblock__top-bar">
                    <div class="py-codeblock__top-bar__filename">
                        <ion-icon name="ios-document" />
                        <span>{this.filename}</span>
                    </div>
                    <div class="py-codeblock__top-bar__buttons">
                        <button class="button reduce" title="Reduce" type="button" onClick={this.reduce.bind(this)}>
                            -
                        </button>
                        <button class="button open" title="Open" type="button" onClick={this.open.bind(this)}>
                            =
                        </button>
                        <button class="button maximize" title="Maximize" type="button" onClick={this.maximize.bind(this)}>
                            &#9633;
                        </button>
                    </div>
                </div>
                <div class="py-codeblock__code-view" />
            </div>
        );
    }
}
