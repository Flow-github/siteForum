import { Component, ElementRef, ViewChild } from "@angular/core";
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

    public onSubmitForm():void{
        if(this.createAccountForm.status == 'INVALID'){
            this.formIsInvalid();
        }else if(this.createAccountForm.status == 'VALID'){
            this.formIsValid();
        }
    }

    private formIsInvalid():void{
        var formControl:FormControl;
        var control:string;
        for(control in this.createAccountForm.controls){
            formControl = this.createAccountForm.controls[control] as FormControl;
            if((formControl as any).nativeElement != null){
                if(formControl.valid){
                    (formControl as any).nativeElement.classList.add('greenBorder');
                    (formControl as any).nativeElement.classList.remove('redBorder');
                }else{
                    (formControl as any).nativeElement.classList.add('redBorder');
                    (formControl as any).nativeElement.classList.remove('greenBorder');
                }
            }else{
                if(control == 'cgu'){
                    this._displayError.nativeElement.innerHTML = '<span>Vous devez accepter les conditions d\'utilisations</span>';
                }
            }
        }
    }

    private formIsValid():void{
        let formControl:FormControl;
        let control:string;
        let testError:string = '';
        let valueMDP:string;
        let valueConfMDP:string
        for(control in this.createAccountForm.controls){
            formControl = this.createAccountForm.controls[control] as FormControl;
            if((formControl as any).nativeElement != null){
                (formControl as any).nativeElement.classList.remove('redBorder');
                (formControl as any).nativeElement.classList.remove('greenBorder');
            }

            switch(control){
                case 'password':
                    valueMDP = formControl.value;
                break;
                case 'passwordConfirm':
                    valueConfMDP = formControl.value;
                break;
                default :
                break;
            }
        }

        if(valueMDP == valueConfMDP){

        }else{
            testError = 'Vous n\'avez pas entré deux fois le même mot de passe !';
            (this.createAccountForm.controls['password'] as any).nativeElement.classList.add('redBorder');
            (this.createAccountForm.controls['passwordConfirm'] as any).nativeElement.classList.add('redBorder');
        }

        this._displayError.nativeElement.innerHTML = '<span>' + testError + '</span>';
    }

}