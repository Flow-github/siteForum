import { UserTwitteEntities } from './userTwitte.entities';

export class TwitteEntities{

    private _id:string;
    private _text:string;
    private _createdDate:string;
    private _favoriteCount:number;
    private _favorited:boolean;
    private _retweetCount:number;
    private _retweeted:boolean;
    private _hashtags:Array<any>;
    private _userTwitte:UserTwitteEntities;

    constructor(twitteParams:any){
        this._id = twitteParams.id_str;
        this._text = twitteParams.text;
        this._createdDate = twitteParams.created_at;
        this._favoriteCount = twitteParams.favorite_count;
        this._favorited = twitteParams.favorited;
        this._retweetCount = twitteParams.retweet_count;
        this._retweeted = twitteParams.retweeted;
        this._hashtags = twitteParams.entities.hashtags;
        this._userTwitte = new UserTwitteEntities(twitteParams.user);
    }

    public get id():string{
        return this._id;
    }

    public get text():string{
        return this._text;
    }

    public get createdDate():string{
        return this._createdDate;
    }

    public get favoriteCount():number{
        return this._favoriteCount;
    }

    public get favorited():boolean{
        return this._favorited;
    }

    public get retweetCount():number{
        return this._retweetCount;
    }

    public get retweeted():boolean{
        return this._retweeted;
    }

    public get isFollow():boolean{
        return this._favorited || this._retweeted;
    }

    public get hashtags():Array<any>{
        return this._hashtags;
    }

    public get userTwitte():UserTwitteEntities{
        return this._userTwitte;
    }

}