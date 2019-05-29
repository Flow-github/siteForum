import { Component, ElementRef, ViewChild } from "@angular/core";
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: '',
    templateUrl: './app.account.html',
    styleUrls: ['./app.account.scss']
})
export class AccountComponent extends AbstractPage{
    
    @ViewChild('displayError') _displayError:ElementRef;

    public createAccountForm:FormGroup;

    constructor(private _routeService:RouteService, _elRef:ElementRef, private _requestService:RequestService, private _formBuilder: FormBuilder){
        super(_routeService, _elRef);
    }

    public ngOnInit():void{
        super.ngOnInit();

        this.createAccountForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required ],
            passwordConfirm: ['', Validators.required ],
            pseudo: ['', Validators.required ],
            cgu: ['', Validators.required ],
        });
    }

    public ngOnDestroy():void{
        super.ngOnDestroy();
    }

}