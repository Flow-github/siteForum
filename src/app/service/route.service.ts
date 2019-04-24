import { EventEmitter } from '@angular/core';

export class RouteService{

    public routeStartChange:EventEmitter<any>;
    public pageClose:EventEmitter<any>;
    public routeChanged:EventEmitter<any>;

    constructor(){
        this.routeStartChange = new EventEmitter<any>();
        this.pageClose = new EventEmitter<any>();
        this.routeChanged = new EventEmitter<any>();
    }

}