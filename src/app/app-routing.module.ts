import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from "./app.component";
import {UnrollComponent} from "./unroll/unroll.component";
import {TextComponent} from "./text/text.component";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'unroll', component: UnrollComponent},
  {path: 'text', component: TextComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
