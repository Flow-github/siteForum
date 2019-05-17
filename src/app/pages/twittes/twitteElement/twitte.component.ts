import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { TwitteEntities } from 'src/app/entities/twitte.entities';

@Component({
    selector: 'twitteButton-root',
    templateUrl: './twitte.component.html',
    styleUrls: ['./twitte.component.scss']
})
export class TwitteComponent implements OnInit, OnDestroy{

    @Input() _twitteEntity:TwitteEntities;
    @ViewChild('twitteComponent') _twitteElement:ElementRef;

    private _callFunctionClick:Function;

    public get id():string{
        return this._twitteEntity.id;
    }

    public get text():string{
        return this._twitteEntity.text;
    }

    public get date():Date{
        let date:Date = new Date(this._twitteEntity.createdDate);
        return date;
    }

    public get author():string{
        return this._twitteEntity.userTwitte.name;
    }

    constructor(){

    }

    public ngOnInit():void{
        this._callFunctionClick = (e:MouseEvent) => {this.onClick(e)};

        this._twitteElement.nativeElement.addEventListener('click', this._callFunctionClick);
    }

    public ngOnDestroy():void{
        this._twitteElement.nativeElement.removeEventListener('click', this._callFunctionClick);
        this._callFunctionClick = null;
    }

    private onClick(e:MouseEvent):void{
        console.log('onClick');
    }

}