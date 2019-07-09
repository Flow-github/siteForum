import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/app.home';
import { ContactComponent } from './pages/contact/app.contact';
import { TwittesListComponent } from './pages/twittes/app.twittes';
import { TweetComponent } from './pages/tweet/app.tweet';
import { NavService } from './service/nav.service';
import { LoginComponent } from './pages/login/app.login';
import { AccountComponent } from './pages/account/app.account';
import { ConnectService } from './service/connect.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: NavService.HOME_ROUTE, component: HomeComponent},
  {path: NavService.LIST_TWEETS_ROUTE, component: TwittesListComponent},
  {path: NavService.TWEET_ROUTE, component: TweetComponent},
  {path: NavService.LOG_IN, component: LoginComponent},
  {path: NavService.LOG_OUT, canActivate:[ConnectService], component: HomeComponent},
  {path: NavService.CREATE_ACCOUNT, component: AccountComponent},
  {path: NavService.CONTACT_ROUTE, component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
