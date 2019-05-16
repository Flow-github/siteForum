export class UserTwitteEntities{

    private _id:string;
    private _name:string;
    private _description:string;
    private _favouritesCount:number;
    private _fallowersCount:number;
    private _friendsCount:number;
    private _screenName:string;
    private _statusesCount:number;
    private _profileBackgroundColor:string;
    private _profileBackgroundImageUrl:string;
    private _profileBackgroundImageUrlHtpps:string;
    private _profileImageUrl:string;
    private _profileImageUrlHttps:string;
    private _profileTextColor:string;

    constructor(userTwitteParams:any){
        this._id = userTwitteParams.id_str;
        this._name = userTwitteParams.name;
        this._description = userTwitteParams.description;
        this._favouritesCount = userTwitteParams.favourites_count;
        this._fallowersCount = userTwitteParams.followers_count;
        this._friendsCount = userTwitteParams.friends_count;
        this._screenName = userTwitteParams.screen_name;
        this._statusesCount = userTwitteParams.statuses_count;
        this._profileBackgroundColor = userTwitteParams.profile_background_color;
        this._profileBackgroundImageUrl = userTwitteParams.profile_background_image_url;
        this._profileBackgroundImageUrlHtpps = userTwitteParams.profile_background_image_url_https;
        this._profileImageUrl = userTwitteParams.profile_image_url;
        this._profileImageUrlHttps = userTwitteParams.profile_image_url_https;
        this._profileTextColor = userTwitteParams.profile_text_color;
    }

    public get id():string{
        return this._id;
    }

    public get name():string{
        return this._name;
    }

    public get description():string{
        return this._description;
    }

    public get favouritesCount():number{
        return this._favouritesCount;
    }

    public get fallowersCount():number{
        return this._fallowersCount;
    }

    public get friendsCount():number{
        return this._friendsCount;
    }

    public get screenName():string{
        return this._screenName;
    }

    public get statusesCount():number{
        return this._statusesCount;
    }

    public get profileBackgroundColor():string{
        return this._profileBackgroundColor;
    }

    public get profileBackgroundImageUrl():string{
        return this._profileBackgroundImageUrl;
    }

    public get profileBackgroundImageUrlHtpps():string{
        return this._profileBackgroundImageUrlHtpps;
    }

    public get profileImageUrl():string{
        return this._profileImageUrl;
    }

    public get profileImageUrlHttps():string{
        return this._profileImageUrlHttps;
    }

    public get profileTextColor():string{
        return this._profileTextColor;
    }

}