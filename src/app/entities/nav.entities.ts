export class NavEntities{


    constructor(private _name:string, private _url:string){

    }

    public getName():string{
        return this._name;
    }

    public get url():string{
        return this._url;
    }

}