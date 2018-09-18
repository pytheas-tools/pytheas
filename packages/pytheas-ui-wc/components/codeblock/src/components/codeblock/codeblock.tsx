import { Component, Prop, Element } from '@stencil/core';

import CodeMirror from 'codemirror';

import CodeMirrorJavaScript from 'codemirror/mode/javascript/javascript';

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
        console.log('CodeBlock is about to be rendered');
        console.log(CodeMirror.version);
    }

    componentDidLoad() {
        console.log(
            'CodeBlock has been rendered: ',
            this.el,
            this.el.shadowRoot.querySelector('.code'),
            this.code
        );
        CodeMirror.fromTextArea(this.el.shadowRoot.querySelector('.code'), {
            value: this.code,
            mode: 'javascript'
        });
    }

    render() {
        return (
            <div class="codeblock">
                <div class="filename">{this.filename}</div>
                <div class="code">{this.code}</div>
            </div>
        );
    }
}
