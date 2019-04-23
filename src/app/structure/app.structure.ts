import { Component, OnInit, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';

@Component({
  selector: 'structure-root',
  templateUrl: './app.structure.html',
  styleUrls: ['./app.structure.scss']
})
export class StructureComponent implements OnInit, AfterViewChecked {
  
  private _contentGlobalElement:any;
  private _contentElement:any;

  constructor(private _domStructure:ElementRef){
    
  }

  public ngOnInit():void{
    this._contentGlobalElement = this._domStructure.nativeElement.children[0].children[0].children[1];
    this._contentElement = this._domStructure.nativeElement.children[0].children[0].children[1].children[0];
  }

  public ngAfterViewChecked():void{
    var stylesGlobalContent:CSSStyleDeclaration = window.getComputedStyle(this._domStructure.nativeElement.children[0].children[0].children[1], null);
    var globalContentHeight:number = this._contentGlobalElement.clientHeight;
    var contentHeight:number = this._contentElement.clientHeight;
    if(globalContentHeight < contentHeight){
      this._contentGlobalElement.style.height = contentHeight + 'px';
      this._contentGlobalElement.style.minHeight = contentHeight + 'px';
    }
  }

}