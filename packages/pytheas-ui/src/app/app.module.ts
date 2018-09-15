import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AngularSplitModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
