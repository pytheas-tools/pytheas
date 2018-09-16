import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CodeComponent } from './code.component';
import { CodeBlockModule } from './code-block/code-block.module';

@NgModule({
    declarations: [CodeComponent],
    imports: [BrowserModule, CodeBlockModule],
    providers: [],
    exports: [CodeComponent]
})
export class CodeModule {}
