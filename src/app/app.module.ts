import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MessageComponent } from './pages/tweet/messageElement/message.component';
import { LoginComponent } from './pages/login/app.login';
import { AccountComponent } from './pages/account/app.account';
import { ContactComponent } from './pages/contact/app.contact';
import { NativeElementInjectorDirective } from './utils/nativeElement.injector.directive';
import { HeaderComponent } from './header/app.header';
import { ConnectService } from './service/connect.service';
import { FooterComponent } from './footer/app.footer';

@NgModule({
  declarations: [
    StructureComponent,
    HeaderComponent,
    NavComponent,
    NavButtonComponent,
    FooterComponent,
    HomeComponent,
    TwittesListComponent,
    TwitteComponent,
    TweetComponent,
    MessageComponent,
    LoginComponent,
    AccountComponent,
    ContactComponent,
    NativeElementInjectorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr' },
    ConnectService,
    NavService,
    RouteService,
    RequestService,
  ],
  bootstrap: [
    StructureComponent
  ]
})
export class AppModule { }
