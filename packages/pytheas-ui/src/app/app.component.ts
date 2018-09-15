import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    content = `function myScript() {
    return 100;
}`;

    content2 = `function myScript500() {
    return 500;
}`;
}
