import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouteService } from './service/route.service'
import { NavService } from './service/nav.service';
import { StructureComponent } from './structure/app.structure';
import { HomeComponent } from './pages/home/app.home';
import { NavComponent } from './nav/app.nav';
import { NavButtonComponent } from './nav/navElement/navButton.component';
import { TwittesListComponent } from './pages/twittes/app.twittes';
import { ContactComponent } from './pages/contact/app.contact';

@NgModule({
  declarations: [
    StructureComponent,
    NavComponent,
    NavButtonComponent,
    HomeComponent,
    TwittesListComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    NavService,
    RouteService,
  ],
  bootstrap: [
    StructureComponent
  ]
})
export class AppModule { }
