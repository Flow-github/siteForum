import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NavService } from './service/nav.service';
import { StructureComponent } from './structure/app.structure';
import { HomeComponent } from './home/app.home';
import { NavComponent } from './nav/app.nav';
import { NavButtonComponent } from './nav/navElement/navButton.component';

@NgModule({
  declarations: [
    StructureComponent,
    HomeComponent,
    NavComponent,
    NavButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NavService,
  ],
  bootstrap: [StructureComponent]
})
export class AppModule { }
