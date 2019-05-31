import { Component, ElementRef, ViewChild } from "@angular/core";
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
    selector: '',
    templateUrl: './app.account.html',
    styleUrls: ['./app.account.scss']
})
export class AccountComponent extends AbstractPage{
    
    @ViewChild('displayError') _displayError:ElementRef;

    public createAccountForm:FormGroup;

    private _errorsMessage:string;

    constructor(private _routeService:RouteService, _elRef:ElementRef, private _requestService:RequestService, private _formBuilder: FormBuilder){
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
        }, {validator: (formTarget:AbstractControl) => {this.checkCheckbox(formTarget)}});
    }

    public ngOnDestroy():void{
        super.ngOnDestroy();
    }

    public onSubmitForm():void{
        this._errorsMessage = '';
        if(this.createAccountForm.status == 'INVALID'){
            this.formIsInvalid();
        }else if(this.createAccountForm.status == 'VALID'){
            this.formIsValid();
        }
        this.displayErrorMessage();
    }

    private checkCheckbox(formTarget:AbstractControl):void{
        console.log('checkCheckbox');
        /*if(formTarget.get('cgu')){
            console.log(formTarget.get('cgu').value);
            if(!formTarget.get('cgu').value){
                formTarget.get('cgu').reset();
            }
        }*/
    }

    private formIsInvalid():void{
        let formControl:FormControl;
        let control:string;
        let inputValue:any;
        for(control in this.createAccountForm.controls){
            formControl = this.createAccountForm.controls[control] as FormControl;
            inputValue = formControl.value;
            if((formControl as any).nativeElement != null){
                if(formControl.valid){
                    if(control != 'cgu'){
                        (formControl as any).nativeElement.classList.add('greenBorder');
                        (formControl as any).nativeElement.classList.remove('redBorder');
                    }
                }else{
                    (formControl as any).nativeElement.classList.add('redBorder');
                    (formControl as any).nativeElement.classList.remove('greenBorder');
                    if(formControl.errors.maxlength){
                        console.log(formControl.errors);
                        let nameInput:string = control;
                        let maxLength:string = formControl.errors.maxlength.requiredLength.toString();
                        let textError:string = 'Le champ ' + nameInput + ' ne peut comprendre au maximum que ' + maxLength + ' charactéres';
                        this.addErrorMessage(textError);
                    }else if(control == 'cgu'){
                        this.addErrorMessage('Vous devez accepter les conditions d\'utilisations');
                    }
                }
            }

            //formControl.reset();
            /*if(control == 'cgu'){
                console.log(formControl);
                formControl.reset();
                (formControl as any).nativeElement.checked = inputValue;
            }else{
                formControl.reset();
                (formControl as any).nativeElement.value = inputValue;
            }*/
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

        this.addErrorMessage(testError);
    }

    private addErrorMessage(textError:string):void{
        this._errorsMessage += textError + '<br/>';
    }

    private displayErrorMessage():void{
        this._displayError.nativeElement.innerHTML = '<span>' + this._errorsMessage + '</span>';
    }

}