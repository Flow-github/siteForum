import { Component, OnInit, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { RouteService } from '../service/route.service';
import { environment } from 'src/environments/environment';

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
    window.addEventListener('resize', (event:any) => {this.onResize(event)});
  }

  public ngAfterViewChecked():void{
    //var stylesGlobalContent:CSSStyleDeclaration = window.getComputedStyle(this._domStructure.nativeElement.children[0].children[0].children[1], null);
    let stylesGlobalContent:CSSStyleDeclaration =  window.getComputedStyle(document.children[0]);
    let heightContentScreen:number = parseInt(stylesGlobalContent.height, 10) - 205;
    //let globalContentHeight:number = this._contentGlobalElement.clientHeight;
    let contentHeight:number = this._contentElement.clientHeight;
    //console.log(globalContentHeight + ' < ' + contentHeight);
    let targetHeight:number = 0;
    if(heightContentScreen > contentHeight){
      targetHeight = heightContentScreen;
    }else{
      targetHeight = contentHeight;
    }

    this._renderer.setStyle(this._contentGlobalElement, 'height', targetHeight + 'px');
    this._renderer.setStyle(this._contentGlobalElement, 'minHeight', targetHeight + 'px');
  }

  private onRouteEvent(event:Event):void{
    if (event instanceof NavigationEnd) {
      this.dispatchNewRoute(event.url);
    }
  }

  private onResize(event:any):void{
    this.ngAfterViewChecked();
  }

  private dispatchNewRoute(newUrl:string):void{
    this._routeService.routeChanged.emit({url:newUrl});
  }

  private startCloseCurrentPage(url:string):void{
    this._newURL = url;
  }

  private changeRoute():void{
    environment.isBackOnSite = true;
    this._route.navigateByUrl(this._newURL);
  }

}