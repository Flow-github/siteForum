import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { StructureComponent } from './structure/app.structure';
import { HomeComponent } from './home/app.home';

@NgModule({
  declarations: [
    StructureComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [StructureComponent]
})
export class AppModule { }
