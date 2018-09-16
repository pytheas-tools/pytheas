import { Component } from '@angular/core';

@Component({
    selector: 'app-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss']
})
export class CodeComponent {
    content = `function myScript() {
        return 100;
    }`;

    content2 = `function myScript500() {
        return 500;
    }`;
}
