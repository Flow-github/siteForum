import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/app.home';
import { ContactComponent } from './pages/contact/app.contact';
import { TwittesListComponent } from './pages/twittes/app.twittes';
import { TweetComponent } from './pages/tweet/app.tweet';
import { NavService } from './service/nav.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: NavService.HOME_ROUTE, component: HomeComponent},
  {path: NavService.LIST_TWEETS_ROUTE, component: TwittesListComponent},
  {path: NavService.TWEET_ROUTE, component: TweetComponent},
  {path: NavService.CONTACT_ROUTE, component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
