import { Component, ElementRef } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';

@Component({
    selector: '',
    templateUrl: './app.contact.html',
    styleUrls: ['./app.contact.scss']
})
export class ContactComponent extends AbstractPage{
    
    constructor(routeService:RouteService, elRef:ElementRef){
        super(routeService, elRef);
    }

}