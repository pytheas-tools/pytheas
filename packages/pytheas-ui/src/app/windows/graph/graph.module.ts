import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GraphComponent } from './graph.component';

@NgModule({
    declarations: [GraphComponent],
    imports: [BrowserModule],
    providers: [],
    exports: [GraphComponent]
})
export class GraphModule {}
