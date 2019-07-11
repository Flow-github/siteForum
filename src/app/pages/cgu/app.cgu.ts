import { Component, ElementRef } from "@angular/core";
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';

@Component({
    selector: '',
    templateUrl: './app.cgu.html',
    styleUrls: ['./app.cgu.scss']
})
export class CGUComponent extends AbstractPage{

    constructor(private _routeService:RouteService, _elRef:ElementRef){
        super(_routeService, _elRef);
    }

}