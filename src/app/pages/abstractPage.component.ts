import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as TWEEN from '@tweenjs/tween.js';
import { RouteService } from '../service/route.service';
import { Subscription } from 'rxjs';
import { environment } from './../../environments/environment'

export class AbstractPage implements OnInit, OnDestroy{

    protected targetHtml:any;
    protected currentUrl:string;
    protected isInit:boolean;
    protected isToOpen:boolean;

    private subRouteStartChange:Subscription;
    private subRouteChange:Subscription;
    private time:any;

    constructor(private routeService:RouteService, private elRef:ElementRef){
        this.subRouteStartChange = this.routeService.routeStartChange.subscribe((url:string) => this.closePage(url));
        this.subRouteChange = this.routeService.routeChanged.subscribe((param:any) => this.openPage(param));
    }

    public ngOnInit():void{
        this.targetHtml = this.elRef.nativeElement.children[0].children[0];
        this.isInit = true;

        if(environment.firstPageView){
            environment.firstPageView = false;
        }else{
            if(this.isToOpen){
                let stylesGlobalContent:CSSStyleDeclaration = window.getComputedStyle(this.targetHtml, null);
                this.targetHtml.style.left = stylesGlobalContent.width;
                this.startChangePage(true);
            }
        }
    }

    public ngOnDestroy():void{
        this.subRouteStartChange.unsubscribe();
        this.subRouteChange.unsubscribe();
        clearInterval(this.time);
    }

    protected openPage(param:any){
        this.currentUrl = param.url;
        if(this.isInit){
            this.startChangePage(true);
        }else{
            this.isToOpen = true;
        }
    }

    protected closePage(url:string){
        if(url[0] != '/'){
            url = '/' + url;
        }
        
        if(url != this.currentUrl){
            this.startChangePage(false);
        }
    }

    protected startChangePage(isAppear:boolean){
        clearInterval(this.time);
        this.time = setInterval(() => this.renderTween(), 20);
        if(isAppear){
            this.appear();
        }else{
            this.disappear();
        }
    }

    protected appear(){
        let stylesGlobalContent:CSSStyleDeclaration = window.getComputedStyle(this.targetHtml, null);
        this.createTween(parseInt(stylesGlobalContent.width, 10), 0);
    }

    protected disappear(){
        let stylesGlobalContent:CSSStyleDeclaration = window.getComputedStyle(this.targetHtml, null);
        this.createTween(parseInt(stylesGlobalContent.left, 10), parseInt(stylesGlobalContent.width, 10));
    }

    protected createTween(startXPosition:number, newXPosition:number):void{
        let pageInitialObject:any = {posX:startXPosition};
        let tween:TWEEN.Tween = new TWEEN.Tween(pageInitialObject);
        tween.to({posX:newXPosition}, 400);
        tween.onUpdate((objectUpdateTween:any) => this.updatedPageByTween(objectUpdateTween));
        tween.onComplete((objectUpdateTween:any) => this.completedPageByTween(objectUpdateTween));
        tween.onStop(function() { console.log('stop'); });
        tween.easing(TWEEN.Easing.Exponential.In);
        tween.start();
    }

    protected updatedPageByTween(objectUpdateTween:any):void{
        this.targetHtml.style.left = objectUpdateTween.posX + "px";
    }

    protected completedPageByTween(objectUpdateTween:any):void{
        clearInterval(this.time);
        if(objectUpdateTween.posX > 0){
            this.routeService.pageClose.emit();
        }
    }

    private renderTween(){
        TWEEN.update();
    }

}