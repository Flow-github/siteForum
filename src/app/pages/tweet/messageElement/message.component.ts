import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MessageEntities } from 'src/app/entities/message.entities';

@Component({
    selector: 'appMessage-root',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy{

    @Input() _messageEntity:MessageEntities;

    public get author():string{
        return this._messageEntity.pseudo;
    }

    public get text():string{
        return this._messageEntity.text;
    }

    public get date():string{
        return this._messageEntity.date;
    }

    constructor(){

    }

    public ngOnInit():void{

    }

    public ngOnDestroy():void{

    }

}