import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: '',
    templateUrl: './app.contact.html',
    styleUrls: ['./app.contact.scss']
})
export class ContactComponent extends AbstractPage{

    @ViewChild('displayReturn') _displayReturn:ElementRef;

    public contactForm:FormGroup;
    
    constructor(private _routeService:RouteService, _elRef:ElementRef, private _requestService:RequestService, private _formBuilder: FormBuilder){
        super(_routeService, _elRef);
    }

    public ngOnInit():void{
        super.ngOnInit();
  
        this.contactForm = this._formBuilder.group({
          name: ['', Validators.required],
          firstName: ['', Validators.required],
          mail: ['', [Validators.required, Validators.email]],
          message: ['', Validators.required]
        });
    }

    public onSubmitForm():void{
        if(this.contactForm.status == 'INVALID'){
            this.formIsInvalid();
        }else if(this.contactForm.status == 'VALID'){
            this.formIsValid();
        }
    }
  
    private formIsInvalid(){
        var formControl:FormControl;
        var control:string;
        for(control in this.contactForm.controls){
            formControl = this.contactForm.controls[control] as FormControl;
            if(formControl.valid){
                this.addGreenBorderTo(control);
            }else{
                this.addRedBorderTo(control);
            }
        }
    }
  
    private formIsValid(){
        this._requestService.sendMail(this.contactForm.value).subscribe((res:Response) => this.sendMessageHandler(res), (err:HttpErrorResponse) => this.sendMessageErrorHandler(err));;
        //console.log(this.contactForm.value);
        var formControl:FormControl;
        var control:string;
        for(control in this.contactForm.controls){
            formControl = this.contactForm.controls[control] as FormControl;
            this.removeBorderTo(control);
            formControl.reset();
            (formControl as any).nativeElement.value = '';
        }
    }

    private addGreenBorderTo(target:string):void{
        let formControl:FormControl = this.contactForm.get(target) as FormControl;
        (formControl as any).nativeElement.classList.add('greenBorder');
        (formControl as any).nativeElement.classList.remove('redBorder');
    }

    private addRedBorderTo(target:string):void{
        let formControl:FormControl = this.contactForm.get(target) as FormControl;
        (formControl as any).nativeElement.classList.add('redBorder');
        (formControl as any).nativeElement.classList.remove('greenBorder');
    }

    private removeBorderTo(target:string):void{
        let formControl:FormControl = this.contactForm.get(target) as FormControl;
        (formControl as any).nativeElement.classList.remove('redBorder');
        (formControl as any).nativeElement.classList.remove('greenBorder');
    }
  
    private sendMessageHandler(res:Response){
        //console.log(res);
        this._displayReturn.nativeElement.classList.remove('errorContact');
        this._displayReturn.nativeElement.classList.add('succesContact');
        this._displayReturn.nativeElement.innerHTML = '<span>Votre message a bien été envoyé</span>';
    }
  
    private sendMessageErrorHandler(err:HttpErrorResponse){
        //console.log(err);
        this._displayReturn.nativeElement.classList.remove('succesContact');
        this._displayReturn.nativeElement.classList.add('errorContact');
        this._displayReturn.nativeElement.innerHTML = '<span>Une erreure est survenue, veuillez recommencer ultérieurement</span>';
    }

}