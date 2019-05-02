import { Component, ElementRef } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';

@Component({
    selector: '',
    templateUrl: './app.twittes.html',
    styleUrls: ['./app.twittes.scss']
})
export class TwittesListComponent extends AbstractPage{
    
    constructor(routeService:RouteService, elRef:ElementRef){
        super(routeService, elRef);
    }

}