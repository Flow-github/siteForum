import { Component, ElementRef } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: '',
    templateUrl: './app.contact.html',
    styleUrls: ['./app.contact.scss']
})
export class ContactComponent extends AbstractPage{
    
    constructor(private _routeService:RouteService, _elRef:ElementRef, private _requestService:RequestService, private _formBuilder: FormBuilder){
        super(_routeService, _elRef);
    }

}