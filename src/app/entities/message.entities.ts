export class MessageEntities{

    private _id:number;
    private _idUser:number;
    private _idTweet:string;
    private _date:string;
    private _pseudo:string;
    private _text:string;

    constructor(messageParams:any){
        this._id = messageParams.id;
        this._idUser = messageParams.id_user;
        this._idTweet = messageParams.id_tweet;
        this._date = messageParams.date;
        this._pseudo = messageParams.pseudo;
        this._text = messageParams.text;
    }

    get id():number{
        return this._id;
    }

    get idUser():number{
        return this._idUser;
    }

    get idTweet():string{
        return this._idTweet;
    }

    get date():string{
        return this._date;
    }

    get pseudo():string{
        return this._pseudo;
    }

    get text():string{
        return this._text;
    }

}