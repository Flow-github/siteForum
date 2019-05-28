import { NavEntities } from '../entities/nav.entities'

export class NavService{

    public static readonly HOME_ROUTE:string = 'home';
    public static readonly LIST_TWEETS_ROUTE:string = 'tous-les-tweets-foot-infos';
    public static readonly TWEET_ROUTE:string = 'tweet-foot-infos';
    public static readonly LOG_IN:string = 'log-in';
    public static readonly CREATE_ACCOUNT:string = 'create-account';
    public static readonly CONTACT_ROUTE:string = 'contact';

    private _navList:Array<NavEntities>;

    constructor(){
        this._navList = new Array<NavEntities>();
        this._navList.push(new NavEntities('Créer un profil', NavService.CREATE_ACCOUNT));
        this._navList.push(new NavEntities('Les Tweets', NavService.LIST_TWEETS_ROUTE));
        this._navList.push(new NavEntities('Contact', NavService.CONTACT_ROUTE));
    }

    public getNavList():Array<NavEntities>{
        return this._navList;
    }

}