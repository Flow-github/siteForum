import { Component, ElementRef } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TwitteEntities } from 'src/app/entities/twitte.entities';

@Component({
    selector: '',
    templateUrl: './app.twittes.html',
    styleUrls: ['./app.twittes.scss']
})
export class TwittesListComponent extends AbstractPage{
    
    private _listTwittesElements:Array<any>;

    public get listTwittesElements():Array<any>{
        return this._listTwittesElements;
    }

    constructor(routeService:RouteService, elRef:ElementRef, private _requestService:RequestService){
        super(routeService, elRef);

        this.initPage();
    }

    private initPage(){
        this.callTwittes();
    }

    private callTwittes(idTwitte:string = ''){
        this._requestService.getTwittes(idTwitte).subscribe((res:Response) => {this.loadTwittesHandler(res)}, (err:HttpErrorResponse) => {this.loadTwittesErrorHandler(err)});
    }

    private loadTwittesHandler(res:Response){
        this._listTwittesElements = this.transformListResult(res);
        console.log(res);
    }

    private transformListResult(res:Response):Array<TwitteEntities>{
        let listResponse:any = res;
        let listTwitte:Array<TwitteEntities> = new Array<TwitteEntities>();
        let twitte:TwitteEntities;
        for(let twitteObject of (listResponse as Array<any>)){
            twitte = new TwitteEntities(twitteObject);
            listTwitte.push(twitte);
        }

        return listTwitte;
    }

    private loadTwittesErrorHandler(err:HttpErrorResponse){
        console.log('loadTwittesErrorHandler');
        console.log(err);
    }

}