import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';

import { CodeComponent } from './code.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CodeComponent],
    imports: [BrowserModule, CodemirrorModule, FormsModule],
    providers: [],
    exports: [CodeComponent]
})
export class CodeModule {}
