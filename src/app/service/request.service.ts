import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { config } from 'src/environments/config.connexion';

@Injectable()
export class RequestService{

    constructor(private _httpClient:HttpClient){

    }

    public getTwittes(idTwitte:string = ''):Observable<Object>{
        let route:string = '/api/twittes/' + idTwitte;
        return this._httpClient.get(route);
    }

    public getTweet(idTwitte:string):Observable<Object>{
        let route:string = '/api/twitte/' + idTwitte;
        return this._httpClient.get(route);
    }

    public getMessagesFromTweet(idTwitte:string):Observable<Object>{
        let route:string = '/api/twitte/messages/' + idTwitte;
        return this._httpClient.get(route);
    }

    public logIn(pLogin:string, pPassword:string):Observable<Object>{
        let route:string = '/api/login';
        let params:any = {login:pLogin, password:pPassword};
        return this._httpClient.post(route, params);
    }

    public addMessage(pText:string, pIdTweet:string, pIdUser:number):Observable<Object>{
        let route:string = '/api/twitte/message';
        let params:any = {text:pText, id_tweet:pIdTweet, id_user:pIdUser};
        return this._httpClient.post(route, params);
    }

    public createAccount(pParams:any):Observable<Object>{
        let route:string = '/api/addUser';
        let params:any = {login:pParams.email, password:pParams.password, passwordConfirm:pParams.passwordConfirm, pseudo:pParams.pseudo, cgu:pParams.cgu};
        return this._httpClient.post(route, params);
    }

}