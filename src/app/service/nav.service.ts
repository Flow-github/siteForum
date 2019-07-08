import { NavEntities } from '../entities/nav.entities'
import { ConnectService } from './connect.service';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class NavService{

    public static readonly HOME_ROUTE:string = 'home';
    public static readonly LIST_TWEETS_ROUTE:string = 'tous-les-tweets-foot-infos';
    public static readonly TWEET_ROUTE:string = 'tweet-foot-infos';
    public static readonly LOG_IN:string = 'log-in';
    public static readonly LOG_OUT:string = 'log-out';
    public static readonly CREATE_ACCOUNT:string = 'create-account';
    public static readonly CONTACT_ROUTE:string = 'contact';

    public navChanged:EventEmitter<any>;

    private _navList:Array<NavEntities>;

    constructor(private _connectService:ConnectService){
        this.navChanged = new EventEmitter<any>();
        this._connectService.stateConnectChange.subscribe((state:boolean) => {this.stateConnectHandler(state)});

        this.stateConnectHandler(false);
    }

    private navNotConnected():void{
        this._navList = new Array<NavEntities>();
        this._navList.push(new NavEntities('Créer un profil', NavService.CREATE_ACCOUNT));
        this._navList.push(new NavEntities('Les Tweets', NavService.LIST_TWEETS_ROUTE));
        this._navList.push(new NavEntities('Contact', NavService.CONTACT_ROUTE));
    }

    private navConnected():void{
        this._navList = new Array<NavEntities>();
        this._navList.push(new NavEntities('Se déconnecter', NavService.LOG_OUT));
        this._navList.push(new NavEntities('Les Tweets', NavService.LIST_TWEETS_ROUTE));
        this._navList.push(new NavEntities('Contact', NavService.CONTACT_ROUTE));
    }

    private stateConnectHandler(state:boolean):void{
        if(state){
            this.navConnected();
        }else{
            this.navNotConnected();
        }

        this.navChanged.emit();
    }

    public getNavList():Array<NavEntities>{
        return this._navList;
    }

}