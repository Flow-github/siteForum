import { Component, ElementRef, ViewChild } from "@angular/core";
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionEntities } from 'src/app/entities/session.entities';
import { environment } from 'src/environments/environment';
import { NavService } from 'src/app/service/nav.service';

@Component({
    selector: '',
    templateUrl: './app.login.html',
    styleUrls: ['./app.login.scss']
})
export class LoginComponent extends AbstractPage{

    @ViewChild('displayError') _displayError:ElementRef;

    public loginForm:FormGroup;

    constructor(private _routeService:RouteService, _elRef:ElementRef, private _requestService:RequestService, private _formBuilder: FormBuilder){
        super(_routeService, _elRef);
    }

    public ngOnInit():void{
        super.ngOnInit();

        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required ],
        });
    }

    public onSubmitForm():void{
        if(this.loginForm.status == 'INVALID'){
            this.formIsInvalid();
        }else if(this.loginForm.status == 'VALID'){
            this.formIsValid();
        }
    }

    private formIsInvalid():void{
        var formControl:FormControl;
        var control:string;
        for(control in this.loginForm.controls){
            formControl = this.loginForm.controls[control] as FormControl;
            if(formControl.valid){
                (formControl as any).nativeElement.classList.add('greenBorder');
                (formControl as any).nativeElement.classList.remove('redBorder');
            }else{
                (formControl as any).nativeElement.classList.add('redBorder');
                (formControl as any).nativeElement.classList.remove('greenBorder');
            }
        }
    }

    private formIsValid():void{
        this._requestService.logIn(this.loginForm.value.email, this.loginForm.value.password).subscribe((res:Response) => {this.logToHandler(res)}, (err:HttpErrorResponse) => {this.logToErrorHandler(err)});

        var formControl:FormControl;
        var control:string;
        for(control in this.loginForm.controls){
            formControl = this.loginForm.controls[control] as FormControl;
            (formControl as any).nativeElement.classList.remove('redBorder');
            (formControl as any).nativeElement.classList.remove('greenBorder');
        }

        this._displayError.nativeElement.innerHTML = '<span></span>';
    }

    private logToHandler(res:Response):void{
        let userObject:any = res;
        sessionStorage.setItem(SessionEntities.KEY_IS_CONNECTED, '1');
        sessionStorage.setItem(SessionEntities.KEY_ID_USER, userObject.id.toString());
        sessionStorage.setItem(SessionEntities.KEY_PSEUDO_USER, userObject.pseudo);

        if(environment.isBackOnSite){
            window.history.back();
        }else{
            this._routeService.routeStartChange.emit(NavService.LIST_TWEETS_ROUTE);
        }
    }

    private logToErrorHandler(err:HttpErrorResponse):void{
        console.log(err);
        if(err.status == 404){
            this._displayError.nativeElement.innerHTML = '<span>Votre login ou vatre password sont incorrecte</span>';
        }else{
            this._displayError.nativeElement.innerHTML = '<span>Un problème inconnu est survenu veuillez réessayer plus tard</span>';
        }
    }

}