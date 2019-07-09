import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { RouteService } from '../service/route.service';
import { NavService } from '../service/nav.service';
import { Subscription } from 'rxjs';
import { RequestService } from '../service/request.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { UserTwitteEntities } from '../entities/userTwitte.entities';
import { ConnectService } from '../service/connect.service';
import { SessionEntities } from '../entities/session.entities';

@Component({
    selector: 'header-root',
    templateUrl: './app.header.html',
    styleUrls: ['./app.header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

    private static readonly LOGIN:string = 'LOGIN';
    private static readonly LOGOUT:string = 'LOGOUT';

    @ViewChild('bgHeader') _bgHeader:ElementRef;
    @ViewChild('buttonLog') _buttonLog:ElementRef;

    public textLog:string;
    public screenName:string;

    private _subLoadProfile:Subscription;
    private _callClickBgHeader:Function;
    private _callClickBtLog:Function;

    constructor(private _routeService:RouteService,
                private _requestService:RequestService,
                private _connectService:ConnectService){
        
    }

    public ngOnInit():void{
        this._subLoadProfile = this._requestService.getUserTwitterProfil(environment.idUserProfile).subscribe((res:Response) => {this.loadProfileHandler(res)}, (err:HttpErrorResponse) => {this.loadProfileErrorHandler(err)});

        this.stateConnectHandler(sessionStorage.getItem(SessionEntities.KEY_IS_CONNECTED) == '1');

        this._callClickBgHeader = (e:MouseEvent) => {this.onClickBgHandler(e)};
        this._callClickBtLog = (e:MouseEvent) => {this.onClickLogHandler(e)};

        this._bgHeader.nativeElement.addEventListener('click', this._callClickBgHeader);
        this._buttonLog.nativeElement.addEventListener('click', this._callClickBtLog);

        this._connectService.stateConnectChange.subscribe((state:boolean) => {this.stateConnectHandler(state)});
    }

    public ngOnDestroy():void{
        this._bgHeader.nativeElement.removeEventListener('click', this._callClickBgHeader);
        this._buttonLog.nativeElement.removeEventListener('click', this._callClickBtLog);

        this._connectService.stateConnectChange.unsubscribe();

        if(this._subLoadProfile){
            this._subLoadProfile.unsubscribe();
        }
    }

    private loadProfileHandler(res:Response):void{
        this._subLoadProfile.unsubscribe();
        let userProfil:UserTwitteEntities = new UserTwitteEntities(res);
        this.screenName = userProfil.screenName;
    }

    private loadProfileErrorHandler(err:HttpErrorResponse):void{
        this._subLoadProfile.unsubscribe();
    }

    private onClickBgHandler(e:MouseEvent):void{
        this._routeService.routeStartChange.emit(NavService.HOME_ROUTE);
    }

    private onClickLogHandler(e:MouseEvent):void{
        if(sessionStorage.getItem(SessionEntities.KEY_IS_CONNECTED) == '1'){
            this._connectService.stateDisconnect();
        }else{
            this._routeService.routeStartChange.emit(NavService.LOG_IN);
        }
    }

    private stateConnectHandler(state:boolean):void{
        if(state){
            this.textLog = HeaderComponent.LOGOUT;
        }else{
            this.textLog = HeaderComponent.LOGIN;
        }
    }

}