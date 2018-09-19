import { Component, Prop, Element } from '@stencil/core';

@Component({
    tag: 'py-codeblock',
    styleUrl: 'codeblock.scss',
    shadow: true
})
export class CodeBlock {
    @Prop()
    code: string;
    @Prop()
    filename: string;

    @Element()
    el: HTMLElement;

    componentWillLoad() {
        //console.log('CodeBlock is about to be rendered..');
    }

    componentDidLoad() {
        window['CodeMirror'](this.el.shadowRoot.querySelector('.code'), {
            value: this.code,
            mode: 'javascript',
            lineNumbers: true,
            viewportMargin: Infinity,
            lineWrapping: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });
    }

    render() {
        return (
            <div class="codeblock">
                <div class="filename">{this.filename}</div>
                <div class="code" />
            </div>
        );
    }
}
