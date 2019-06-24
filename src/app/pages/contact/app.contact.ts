import { Component, ElementRef } from '@angular/core';
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
        /*var formControl:FormControl;
        var control:string;
        for(control in this.contactForm.controls){
            formControl = this.contactForm.controls[control] as FormControl;
            if(formControl.valid){
                (formControl as any).nativeElement.style.borderLeftColor = "green";
                (formControl as any).nativeElement.style.borderLeftWidth = '2px';
            }else{
                (formControl as any).nativeElement.style.borderLeftColor = "red";
                (formControl as any).nativeElement.style.borderLeftWidth = '2px';
            }
        }*/
    }
  
    private formIsValid(){
        //this.sendMessage.sendMessage(this.contactForm.value).subscribe((res:ArrayBuffer) => this.resultSaveMessage(res), (err:HttpErrorResponse) => this.resultSaveMessageError(err));;
  
        /*var formControl:FormControl;
        var control:string;
        for(control in this.contactForm.controls){
            formControl = this.contactForm.controls[control] as FormControl;
            (formControl as any).nativeElement.style.borderLeftColor = "";
            (formControl as any).nativeElement.style.borderLeftWidth = '0px';
            formControl.reset();
            (formControl as any).nativeElement.value = '';
        }*/
    }
  
    private resultSaveMessage(res:ArrayBuffer){
        console.log(res);
    }
  
    private resultSaveMessageError(err:HttpErrorResponse){
        console.log(err);
    }

}