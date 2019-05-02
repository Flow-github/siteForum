import { Component, OnInit, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';
import { RouteService } from '../service/route.service';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'structure-root',
  templateUrl: './app.structure.html',
  styleUrls: ['./app.structure.scss']
})
export class StructureComponent implements OnInit, AfterViewChecked {
  
  private _contentGlobalElement:any;
  private _contentElement:any;
  private _newURL:string;

  constructor(private _domStructure:ElementRef,
              private _renderer:Renderer2,
              private _routeService:RouteService,
              private _route:Router){
    
  }

  public ngOnInit():void{
    this._contentGlobalElement = this._domStructure.nativeElement.children[0].children[0].children[1];
    this._contentElement = this._domStructure.nativeElement.children[0].children[0].children[1].children[0];
    this._routeService.routeStartChange.subscribe((url:string) => this.startCloseCurrentPage(url));
    this._routeService.pageClose.subscribe(() => this.changeRoute());
    this._route.events.subscribe((event:Event):void => { this.onRouteEvent(event)});
  }

  public ngAfterViewChecked():void{
    var stylesGlobalContent:CSSStyleDeclaration = window.getComputedStyle(this._domStructure.nativeElement.children[0].children[0].children[1], null);
    var globalContentHeight:number = this._contentGlobalElement.clientHeight;
    var contentHeight:number = this._contentElement.clientHeight;
    if(globalContentHeight < contentHeight){
      this._renderer.setStyle(this._contentGlobalElement, 'height', contentHeight + 'px');
      this._renderer.setStyle(this._contentGlobalElement, 'minHeight', contentHeight + 'px');
    }
  }

  private onRouteEvent(event:Event):void{
    if (event instanceof NavigationEnd) {
      this.dispatchNewRoute(event.url);
    }
  }

  private dispatchNewRoute(newUrl:string){
    this._routeService.routeChanged.emit({url:newUrl});
  }

  private startCloseCurrentPage(url:string):void{
    this._newURL = url;
    //console.log('-------------');
    //this._route.navigateByUrl(this._newURL);
  }

  private changeRoute():void{
    this._route.navigateByUrl(this._newURL);
  }

}