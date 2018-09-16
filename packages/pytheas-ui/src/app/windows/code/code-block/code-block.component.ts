import { Component } from '@angular/core';

@Component({
    selector: 'app-code-block',
    templateUrl: './code-block.component.html',
    styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent {
    content = `function myScript(): string {
        return 100;
    }`;

    options = {
        lineNumbers: true,
        theme: 'mdn-like',
        mode: 'javascript',
        readOnly: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    };
}
