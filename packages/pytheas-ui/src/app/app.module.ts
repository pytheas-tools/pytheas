import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import 'codemirror/mode/javascript/javascript';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AngularSplitModule, CodemirrorModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
