import { Component, ElementRef } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/service/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: '',
    templateUrl: './app.home.html',
    styleUrls: ['./app.home.scss']
})
export class HomeComponent extends AbstractPage {

    private _subLoadProfile:Subscription;
  
    constructor(routeService:RouteService, elRef:ElementRef, private _requestService:RequestService){
        super(routeService, elRef);
    }

    public ngOnInit():void{
        super.ngOnInit();

        this._subLoadProfile = this._requestService.getUserTwitterProfil(environment.idUserProfile).subscribe((res:Response) => {this.loadProfileHandler(res)}, (err:HttpErrorResponse) => {this.loadProfileErrorHandler(err)});
    }

    public ngOnDestroy():void{
        super.ngOnDestroy();

        if(this._subLoadProfile){
            this._subLoadProfile.unsubscribe();
        }
    }

    private loadProfileHandler(res:Response):void{
        console.log('loadProfileHandler');
        console.log(res);
    }

    private loadProfileErrorHandler(err:HttpErrorResponse):void{
        console.log('loadProfileErrorHandler');
        console.log(err);
    }

}