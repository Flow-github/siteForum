import { Component } from '@angular/core';
import { NavService } from '../service/nav.service';
import { NavEntities } from '../entities/nav.entities';

@Component({
    selector: 'nav-root',
    templateUrl: './app.nav.html',
    styleUrls: ['./app.nav.scss']
})
export class NavComponent{

    private listNavElements:Array<NavEntities>

    constructor(private _navService:NavService){

    }

    public ngOnInit():void{
        this.listNavElements = this._navService.getNavList();
    }

}