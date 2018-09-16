import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldcode';

import { CodeBlockComponent } from './code-block.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CodeBlockComponent],
    imports: [BrowserModule, CodemirrorModule, FormsModule],
    providers: [],
    exports: [CodeBlockComponent]
})
export class CodeBlockModule {}
