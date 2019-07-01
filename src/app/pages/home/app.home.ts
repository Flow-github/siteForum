import { Component, ElementRef } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/service/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserTwitteEntities } from 'src/app/entities/userTwitte.entities';

@Component({
    selector: '',
    templateUrl: './app.home.html',
    styleUrls: ['./app.home.scss']
})
export class HomeComponent extends AbstractPage {

    public urlImgBanner:string;
    public urlImgProfile:string;
    public screenName:string;
    public numTweets:string;
    public numAbonnements:string;
    public numAbonnes:string;
    public numLikes:string;
    public name:string;
    public description:string;

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
        this._subLoadProfile.unsubscribe();
        let userProfil:UserTwitteEntities = new UserTwitteEntities(res);

        this.urlImgBanner = userProfil.profileBannerUrl;
        this.urlImgProfile = userProfil.profileImageUrl;
        this.screenName = userProfil.screenName;
        this.numTweets = userProfil.statusesCount.toString();
        this.numAbonnements = userProfil.friendsCount.toString();
        this.numAbonnes = userProfil.fallowersCount.toString();
        this.numLikes = userProfil.favouritesCount.toString();
        this.name = userProfil.name;
        this.description = userProfil.description;
    }

    private loadProfileErrorHandler(err:HttpErrorResponse):void{
        this._subLoadProfile.unsubscribe();
    }

}