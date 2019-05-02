import { Component, ElementRef } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';

@Component({
    selector: '',
    templateUrl: './app.home.html',
    styleUrls: ['./app.home.scss']
})
export class HomeComponent extends AbstractPage {
  
    constructor(routeService:RouteService, elRef:ElementRef){
        super(routeService, elRef);
    }

}