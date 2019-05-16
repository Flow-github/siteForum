import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/environments/config.connexion';

@Injectable()
export class RequestService{

    constructor(private _httpClient:HttpClient){

    }

    public getTwittes(idTwitte:string = ''):Observable<Object>{
        let route:string = '/api/twittes/' + idTwitte;
        return this._httpClient.get(route);
    }

}