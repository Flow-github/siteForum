import { EventEmitter, Injectable } from '@angular/core';
import { SessionEntities } from '../entities/session.entities';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ConnectService implements CanActivate{

    public static readonly IS_CONNECTED:boolean = true;
    public static readonly IS_NOT_CONNECTED:boolean = false;

    public stateConnectChange:EventEmitter<any>;

    constructor(){
        this.stateConnectChange = new EventEmitter<any>();
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        this.stateDisconnect();

        return false;
    }

    public stateConnect(userId:string, userPseudo:string):void{
        sessionStorage.setItem(SessionEntities.KEY_IS_CONNECTED, '1');
        sessionStorage.setItem(SessionEntities.KEY_ID_USER, userId);
        sessionStorage.setItem(SessionEntities.KEY_PSEUDO_USER, userPseudo);

        this.stateConnectChange.emit(ConnectService.IS_CONNECTED);
    }

    public stateDisconnect():void{
        sessionStorage.clear();

        this.stateConnectChange.emit(ConnectService.IS_NOT_CONNECTED);
    }

}