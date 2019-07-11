import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'footer-root',
    templateUrl: './app.footer.html',
    styleUrls: ['./app.footer.scss']
})
export class FooterComponent implements OnInit{

    public dateAnnee:string;

    constructor(){

    }

    public ngOnInit():void{
        let dateNow:Date = new Date();
        this.dateAnnee = dateNow.getFullYear().toString();
    }

}