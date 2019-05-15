import { Component } from '@angular/core';
import { NavService } from '../service/nav.service';
import { NavEntities } from '../entities/nav.entities';
import { NavButtonComponent } from './navElement/navButton.component';

@Component({
    selector: 'nav-root',
    templateUrl: './app.nav.html',
    styleUrls: ['./app.nav.scss']
})
export class NavComponent{

    private _listNavElements:Array<NavEntities>;

    public get listNavElements():Array<NavEntities>{
        return this._listNavElements;
    }

    constructor(private _navService:NavService){
        
    }

    public ngOnInit():void{
        this._listNavElements = this._navService.getNavList();
    }

}