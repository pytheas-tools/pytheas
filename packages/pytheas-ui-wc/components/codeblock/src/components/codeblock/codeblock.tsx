import { Component, Prop } from '@stencil/core';

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

    render() {
        return (
            <div class="codeblock">
                <div class="filename">{this.filename}</div>
                <div class="code">{this.code}</div>
            </div>
        );
    }
}
