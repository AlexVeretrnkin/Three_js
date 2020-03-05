import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnrollComponent } from './unroll/unroll.component';
import {AppRoutingModule} from "./app-routing.module";
import { TextComponent } from './text/text.component';

@NgModule({
  declarations: [
    AppComponent,
    UnrollComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
