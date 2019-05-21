import { NavEntities } from '../entities/nav.entities'

export class NavService{

    public static readonly HOME_ROUTE:string = 'home';
    public static readonly LIST_TWEETS_ROUTE:string = 'tous-les-tweets-foot-infos';
    public static readonly TWEET_ROUTE:string = 'tweet-foot-infos';
    public static readonly CONTACT_ROUTE:string = 'contact';

    private _navList:Array<NavEntities>;

    constructor(){
        this._navList = new Array<NavEntities>();
        var entityNav:NavEntities = new NavEntities('Les Tweets', NavService.LIST_TWEETS_ROUTE);
        this._navList.push(entityNav);
        entityNav = new NavEntities('Contact', NavService.CONTACT_ROUTE);
        this._navList.push(entityNav);
    }

    public getNavList():Array<NavEntities>{
        return this._navList;
    }

}