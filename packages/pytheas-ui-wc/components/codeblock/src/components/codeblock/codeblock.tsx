import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'py-codeblock',
    styleUrl: 'codeblock.css',
    shadow: true
})
export class CodeBlock {
    @Prop()
    first: string;
    @Prop()
    last: string;

    render() {
        return (
            <div>
                Hello, World! I'm {this.first} {this.last}
            </div>
        );
    }
}
