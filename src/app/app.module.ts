import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { RequestService } from 'src/app/service/request.service';
import { AppRoutingModule } from './app-routing.module';
import { RouteService } from './service/route.service'
import { NavService } from './service/nav.service';
import { StructureComponent } from './structure/app.structure';
import { HomeComponent } from './pages/home/app.home';
import { NavComponent } from './nav/app.nav';
import { NavButtonComponent } from './nav/navElement/navButton.component';
import { TwittesListComponent } from './pages/twittes/app.twittes';
import { TwitteComponent } from './pages/twittes/twitteElement/twitte.component';
import { TweetComponent } from './pages/tweet/app.tweet';
import { ContactComponent } from './pages/contact/app.contact';

@NgModule({
  declarations: [
    StructureComponent,
    NavComponent,
    NavButtonComponent,
    HomeComponent,
    TwittesListComponent,
    TwitteComponent,
    TweetComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr' },
    NavService,
    RouteService,
    RequestService
  ],
  bootstrap: [
    StructureComponent
  ]
})
export class AppModule { }
