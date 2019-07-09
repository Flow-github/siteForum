import { Component, ElementRef, ViewChild } from "@angular/core";
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavService } from 'src/app/service/nav.service';
import { ConnectService } from 'src/app/service/connect.service';

@Component({
    selector: '',
    templateUrl: './app.account.html',
    styleUrls: ['./app.account.scss']
})
export class AccountComponent extends AbstractPage{
    
    private static readonly NAME_INPUT_CONVERT:any = {email:'email', 
                                                    password:'mot de passe',
                                                    passwordConfirm: 'confirmation mot de passe',
                                                    pseudo: 'pseudo'};
    private static readonly ERROR_MESSAGE_NOTSAMEPASSWORD:string = 'Vous n\'avez pas entré deux fois le même mot de passe !';
    private static readonly ERROR_MESSAGE_CGU:string = 'Vous devez accepter les conditions d\'utilisations';
    private static readonly ERROR_MESSAGE_LOGIN_ALREADY_USE:string = 'Cet email est dèja utilisé par un autre compte';
    private static readonly ERROR_MESSAGE_PSEUDO_ALREADY_USE:string = 'Ce pseudo est dèja utilisé par un autre compte';
    private static readonly ERROR_MESSAGE_LOGIN_AND_PSEUDO_ALREADY_USE:string = 'Cet email et ce pseudo sont dèja utilisé par un autre compte';
    private static readonly ERROR_MESSAGE_INCONNU:string = 'Un problème inconnu est survenu veuillez réessayer plus tard';

    @ViewChild('displayError') _displayError:ElementRef;

    public createAccountForm:FormGroup;

    private _cguAccepted:boolean;
    private _errorsMessage:string;
    private _subCreate:Subscription;

    constructor(private _routeService:RouteService,
                        _elRef:ElementRef,
                private _requestService:RequestService,
                private _formBuilder: FormBuilder,
                private _connectService:ConnectService){
        super(_routeService, _elRef);
    }

    public ngOnInit():void{
        super.ngOnInit();

        this.createAccountForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
            password: ['', [Validators.required, Validators.maxLength(255)] ],
            passwordConfirm: ['', [Validators.required] ],
            pseudo: ['', [Validators.required, Validators.maxLength(20)] ],
            cgu: ['', [Validators.required] ],
        },
        {validator: (formTarget:AbstractControl) => {this.checkCheckbox(formTarget)}}
        );
    }

    public ngOnDestroy():void{
        super.ngOnDestroy();

        if(this._subCreate){
            this._subCreate.unsubscribe();
        }
    }

    public onSubmitForm():void{
        this._errorsMessage = '';
        if(this.createAccountForm.status == 'INVALID' || !this._cguAccepted){
            this.formIsInvalid();
        }else if(this.createAccountForm.status == 'VALID'){
            this.formIsValid();
        }
        this.displayErrorMessage();
    }

    private checkCheckbox(formTarget:AbstractControl):void{
        if(formTarget.get('cgu')){
            this._cguAccepted = formTarget.get('cgu').value;
        }
    }

    private formIsInvalid():void{
        let formControl:FormControl;
        let control:string;
        for(control in this.createAccountForm.controls){
            formControl = this.createAccountForm.controls[control] as FormControl;
            if((formControl as any).nativeElement != null){
                if(formControl.valid){
                    if(control != 'cgu'){
                        this.addGreenBorderTo(control);
                    }
                }else{
                    this.addRedBorderTo(control);
                    if(formControl.errors.maxlength){
                        let nameInput:string = AccountComponent.NAME_INPUT_CONVERT[control];
                        let maxLength:string = formControl.errors.maxlength.requiredLength.toString();
                        let textError:string = 'Le champ ' + nameInput + ' ne peut comprendre au maximum que ' + maxLength + ' charactéres';
                        this.addErrorMessage(textError);
                    }
                }
            }
        }

        this.testPasswordValue();

        if(!this._cguAccepted){
            this.addErrorMessage(AccountComponent.ERROR_MESSAGE_CGU);
        }
    }

    private formIsValid():void{
        let formControl:FormControl;
        let control:string;
        for(control in this.createAccountForm.controls){
            formControl = this.createAccountForm.get(control) as FormControl;
            if((formControl as any).nativeElement != null){
                this.addGreenBorderTo(control);
            }
        }

        if(this.testPasswordValue()){
            this._subCreate = this._requestService.createAccount(this.createAccountForm.value).subscribe((res:Response) => {this.createHandler(res)}, (err:HttpErrorResponse) => {this.createErrorHandler(err)});
        }
    }

    private testPasswordValue():boolean{
        let same:boolean = this.createAccountForm.get('password').value == this.createAccountForm.get('passwordConfirm').value;
        if(!same){
            this.addErrorMessage(AccountComponent.ERROR_MESSAGE_NOTSAMEPASSWORD);
            this.addRedBorderTo('password');
            this.addRedBorderTo('passwordConfirm');
        }

        return same;
    }

    private addGreenBorderTo(target:string):void{
        let formControl:FormControl = this.createAccountForm.get(target) as FormControl;
        (formControl as any).nativeElement.classList.add('greenBorder');
        (formControl as any).nativeElement.classList.remove('redBorder');
    }

    private addRedBorderTo(target:string):void{
        let formControl:FormControl = this.createAccountForm.get(target) as FormControl;
        (formControl as any).nativeElement.classList.add('redBorder');
        (formControl as any).nativeElement.classList.remove('greenBorder');
    }

    private removeBorderTo(target:string):void{
        let formControl:FormControl = this.createAccountForm.get(target) as FormControl;
        (formControl as any).nativeElement.classList.remove('redBorder');
        (formControl as any).nativeElement.classList.remove('greenBorder');
    }

    private addErrorMessage(textError:string):void{
        this._errorsMessage += textError + '<br/>';
    }

    private displayErrorMessage():void{
        this._displayError.nativeElement.innerHTML = '<span>' + this._errorsMessage + '</span>';
    }

    private createHandler(res:Response):void{
        this._subCreate.unsubscribe();

        let returnObject:any = res;
        this._connectService.stateConnect(returnObject.insertId, this.createAccountForm.value.pseudo);

        if(environment.isBackOnSite){
            window.history.back();
        }else{
            this._routeService.routeStartChange.emit(NavService.LIST_TWEETS_ROUTE);
        }
    }

    private createErrorHandler(err:HttpErrorResponse):void{
        this._subCreate.unsubscribe();
        if((err.status == 400 && err.error.code == 400) || err.status == 412){
            switch(err.error.error){
                case 1 :
                    this.addRedBorderTo('pseudo');
                break;
                case 2 :
                    this.addRedBorderTo('email');
                break;
                case 3 :
                    this.addRedBorderTo('password');
                    this.addRedBorderTo('passwordConfirm');
                    this.addErrorMessage(AccountComponent.ERROR_MESSAGE_NOTSAMEPASSWORD);
                break;
                case 4 :
                    this.addErrorMessage(AccountComponent.ERROR_MESSAGE_CGU);
                break;
                case 5 :
                    this.addRedBorderTo('email');
                    this.addErrorMessage(AccountComponent.ERROR_MESSAGE_LOGIN_ALREADY_USE);
                break;
                case 6 :
                    this.addRedBorderTo('pseudo');
                    this.addErrorMessage(AccountComponent.ERROR_MESSAGE_PSEUDO_ALREADY_USE);
                break;
                case 7 :
                    this.addRedBorderTo('email');
                    this.addRedBorderTo('pseudo');
                    this.addErrorMessage(AccountComponent.ERROR_MESSAGE_LOGIN_AND_PSEUDO_ALREADY_USE);
                break;
                default :
                    this.addErrorMessage(err.statusText);
                break;
            }
        }else{
            this.addErrorMessage(AccountComponent.ERROR_MESSAGE_INCONNU);
        }

        this.displayErrorMessage();
    }

}