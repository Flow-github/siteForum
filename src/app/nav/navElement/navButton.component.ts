import { Component, ViewChild, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NavEntities } from 'src/app/entities/nav.entities';
import { RouteService } from 'src/app/service/route.service';
import { NavService } from 'src/app/service/nav.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private _subRouteEvent:Subscription;

    public get name():string{
        return this._name;
    }

    public get url():string{
        return this._url;
    }

    constructor(private _routeService:RouteService, private _route:Router){
        
    }

    public ngOnInit():void{
        this._name = this._navEntity.name;
        this._url = this._navEntity.url;
        this.testSelectButton(this._route.routerState.snapshot.url);

        this._callFunctionClick = (e:MouseEvent) => {this.onClickNavButton(e)};
        this._navButton.nativeElement.addEventListener('click', this._callFunctionClick);
        this._subRouteEvent = this._route.events.subscribe((event:Event):void => { this.onRouteEvent(event)});
    }

    public ngOnDestroy():void{
        this._navButton.nativeElement.removeEventListener('click', this._callFunctionClick);
        if(this._subRouteEvent){
            this._subRouteEvent.unsubscribe();
        }
    }

    private testSelectButton(url:string):void{
        let targetElement:HTMLCollection = this._navButton.nativeElement.children;
        if(url == '/' + this._url){
            switch(this._url){
                case NavService.LIST_TWEETS_ROUTE :
                case NavService.TWEET_ROUTE :
                case NavService.CREATE_ACCOUNT :
                case NavService.CONTACT_ROUTE :
                        targetElement[0].classList.add('selected');
                break;
                default :
                    targetElement[0].classList.remove('selected');
                break;
            }
        }else if(this._url == NavService.LIST_TWEETS_ROUTE && url == '/' + NavService.TWEET_ROUTE){
            targetElement[0].classList.add('selected');
        }else{
            targetElement[0].classList.remove('selected');
        }
    }

    private onClickNavButton(e:MouseEvent):void{
        if(this._url == NavService.LOG_OUT){
            this._route.navigateByUrl(this._url);
        }else{
            this._routeService.routeStartChange.emit(this._url);
        }
    }

    private onRouteEvent(event:Event):void{
        if (event instanceof NavigationEnd) {
            this.testSelectButton(event.url);
        }
    }

}