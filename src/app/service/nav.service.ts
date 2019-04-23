import { NavEntities } from '../entities/nav.entities'

export class NavService{

    private _navList:Array<NavEntities>;

    constructor(){
        this._navList = new Array<NavEntities>();
        var entityNav:NavEntities = new NavEntities('Les Twittes', 'tous-les-twittes-foot-infos');
        this._navList.push(entityNav);
        entityNav = new NavEntities('Contact', 'contact');
        this._navList.push(entityNav);
    }

    public getNavList():Array<NavEntities>{
        return this._navList;
    }

}