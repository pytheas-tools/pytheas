import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';

import { AppComponent } from './app.component';

import { CodeModule } from './windows/code/code.module';
import { GraphModule } from './windows/graph/graph.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AngularSplitModule, CodeModule, GraphModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
