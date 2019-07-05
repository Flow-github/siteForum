import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'header-root',
    templateUrl: './app.header.html',
    styleUrls: ['./app.header.scss']
})
export class HeaderComponent implements OnInit{

    private static readonly LOGIN:string = 'LOGIN';
    private static readonly LOGOUT:string = 'LOGOUT';

    public textLog:string;

    constructor(){
        
    }

    public ngOnInit():void{
        this.textLog = HeaderComponent.LOGIN;
    }

}