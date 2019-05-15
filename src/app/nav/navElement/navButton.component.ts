import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavEntities } from 'src/app/entities/nav.entities';
import { RouteService } from 'src/app/service/route.service';

@Component({
    selector: 'navButton-root',
    templateUrl: './navButton.component.html',
    styleUrls: ['./navButton.component.scss']
})
export class NavButtonComponent{
    
    @Input() _navEntity:NavEntities;
    @ViewChild('navComponent') _navButton:ElementRef;
    private _name:string;
    private _url:string;

    public get name():string{
        return this._name;
    }

    public get url():string{
        return this._url;
    }

    constructor(private _routeService:RouteService){
        
    }

    public ngOnInit():void{
        this._name = this._navEntity.name;
        this._url = this._navEntity.url;

        this._navButton.nativeElement.addEventListener('click', (e:MouseEvent) => {this.onClickNavButton(e)});
    }

    private onClickNavButton(e:MouseEvent):void{
        this._routeService.routeStartChange.emit(this._url);
    }

}