import { Component, ViewChild, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NavEntities } from 'src/app/entities/nav.entities';
import { RouteService } from 'src/app/service/route.service';

@Component({
    selector: 'navButton-root',
    templateUrl: './navButton.component.html',
    styleUrls: ['./navButton.component.scss']
})
export class NavButtonComponent implements OnInit, OnDestroy{
    
    @Input() _navEntity:NavEntities;
    @ViewChild('navComponent') _navButton:ElementRef;
    private _name:string;
    private _url:string;
    private _callFunctionClick:Function;

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

        this._callFunctionClick = (e:MouseEvent) => {this.onClickNavButton(e)};
        this._navButton.nativeElement.addEventListener('click', this._callFunctionClick);
    }

    public ngOnDestroy():void{
        this._navButton.nativeElement.removeEventListener('click', this._callFunctionClick);
    }

    private onClickNavButton(e:MouseEvent):void{
        this._routeService.routeStartChange.emit(this._url);
    }

}