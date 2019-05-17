import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TwitteEntities } from 'src/app/entities/twitte.entities';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: '',
    templateUrl: './app.twittes.html',
    styleUrls: ['./app.twittes.scss']
})
export class TwittesListComponent extends AbstractPage{
    
    @ViewChild('seeMoreButton') _seeMoreElement:ElementRef;

    private _listTwittesElements:Array<TwitteEntities>;
    private _subLoadTwittes:Subscription;
    private _callFunctionClick:Function;

    public get listTwittesElements():Array<TwitteEntities>{
        return this._listTwittesElements;
    }

    constructor(routeService:RouteService, elRef:ElementRef, private _requestService:RequestService){
        super(routeService, elRef);
    }

    public ngOnInit():void{
        super.ngOnInit();

        this._listTwittesElements = new Array<TwitteEntities>();

        this._callFunctionClick = (e:MouseEvent) => {this.addTwittes(e)};
        this._seeMoreElement.nativeElement.addEventListener('click', this._callFunctionClick);

        if(environment.listTwittesLoaded != null){
            this._listTwittesElements = environment.listTwittesLoaded;
        }else{
            this.callTwittes();
        }
    }

    public ngOnDestroy():void{
        super.ngOnDestroy();
        this._seeMoreElement.nativeElement.removeEventListener('click', this._callFunctionClick);
        this._callFunctionClick = null;
    }

    private callTwittes(idTwitte:string = ''){
        this._subLoadTwittes = this._requestService.getTwittes(idTwitte).subscribe((res:Response) => {this.loadTwittesHandler(res)}, (err:HttpErrorResponse) => {this.loadTwittesErrorHandler(err)});
    }

    private loadTwittesHandler(res:Response){
        this._listTwittesElements = this._listTwittesElements.concat(this.transformListResult(res));
        environment.listTwittesLoaded = this._listTwittesElements;
        this._subLoadTwittes.unsubscribe();
    }

    private transformListResult(res:Response):Array<TwitteEntities>{
        let listResponse:any = res;
        let listTwitte:Array<TwitteEntities> = new Array<TwitteEntities>();
        let twitte:TwitteEntities;
        let count:number = 0;
        for(let twitteObject of (listResponse as Array<any>)){
            if(this._listTwittesElements.length == 0 || count > 0){
                twitte = new TwitteEntities(twitteObject);
                listTwitte.push(twitte);
            }

            count++;
        }

        return listTwitte;
    }

    private loadTwittesErrorHandler(err:HttpErrorResponse){
        console.log('loadTwittesErrorHandler');
        console.log(err);
    }

    private addTwittes(e:MouseEvent):void{
        this.callTwittes(this._listTwittesElements[this._listTwittesElements.length - 1].id);
    }

}