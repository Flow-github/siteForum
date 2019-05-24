import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AbstractPage } from '../abstractPage.component';
import { RouteService } from 'src/app/service/route.service';
import { RequestService } from 'src/app/service/request.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { TwitteEntities } from 'src/app/entities/twitte.entities';
import { NavService } from 'src/app/service/nav.service';
import { MessageEntities } from 'src/app/entities/message.entities';

@Component({
    selector: '',
    templateUrl: './app.tweet.html',
    styleUrls: ['./app.tweet.scss']
})
export class TweetComponent extends AbstractPage{

    @ViewChild('backButton') _backButton:ElementRef;
    @ViewChild('tweet') _tweet:ElementRef;
    @ViewChild('spanFollow') _spanFollow:ElementRef;
    @ViewChild('spanTag') _spanTag:ElementRef;
    @ViewChild('messageButton') _messageButton:ElementRef;
    @ViewChild('formMessage') _formMessageElement:ElementRef;

    public messageForm:FormGroup;

    private _tweetEntity:TwitteEntities;
    private _listMessages:Array<MessageEntities>;
    private _subLoadTweet:Subscription;
    private _subLoadMessages:Subscription;
    private _callClickTweet:Function;
    private _callClickBack:Function;
    private _callClickAddMessage:Function;
    private _callOverAddMessage:Function;
    private _callOutAddMessage:Function;

    public get id():string{
        return this._tweetEntity ? this._tweetEntity.id : '';
    }

    public get text():string{
        return this._tweetEntity ? this._tweetEntity.text : '';
    }

    public get date():Date{
        let date:Date = new Date(this._tweetEntity ? this._tweetEntity.createdDate : Date.now());
        return date;
    }

    public get author():string{
        return this._tweetEntity ? this._tweetEntity.userTwitte.name : '';
    }

    public get profilImageSrc():string{
        return this._tweetEntity ? this._tweetEntity.userTwitte.profileImageUrl : '';
    }

    public get countFavoris():number{
        return this._tweetEntity ? this._tweetEntity.favoriteCount : 0;
    }

    public get countRetweets():number{
        return this._tweetEntity ? this._tweetEntity.retweetCount : 0;
    }

    public get listTags():string{
        let tags:string = '';
        if(this._tweetEntity){
            for(let i:number = 0; i < this._tweetEntity.hashtags.length; i++){
                tags += ' ' + this._tweetEntity.hashtags[i].text;
            }
        }
        return tags;
    }

    public get listMessages():Array<MessageEntities>{
        return this._listMessages;
    }

    constructor(private _routeService:RouteService, _elRef:ElementRef, private _requestService:RequestService){
        super(_routeService, _elRef);
    }

    public ngOnInit():void{
        super.ngOnInit();

        if(environment.idTweetSelected != ''){
            this._subLoadTweet = this._requestService.getTweet(environment.idTweetSelected).subscribe((res:Response) => {this.loadTweetHandler(res)}, (err:HttpErrorResponse) => {this.loadTweetErrorHandler(err)});
            this._subLoadMessages = this._requestService.getMessagesFromTweet(environment.idTweetSelected).subscribe((res:Response) => {this.loadMessagesHandler(res)}, (err:HttpErrorResponse) => {this.loadMessagesErrorHandler(err)});
            window.scrollTo(0, 0);
        }else{
            this.targetHtml.style.visibility = 'hidden';
            this._routeService.routeStartChange.emit(NavService.LIST_TWEETS_ROUTE);
        }

        this._callClickBack = (e:MouseEvent) => {this.onClickBackHandler(e)};
        this._backButton.nativeElement.addEventListener('click', this._callClickBack);

        this._callClickTweet = (e:MouseEvent) => {this.onClickTweetHandler(e)};
        this._tweet.nativeElement.addEventListener('click', this._callClickTweet);

        this._callClickAddMessage = (e:MouseEvent) => {this.onClickAddMessageHandler(e)};
        this._callOverAddMessage = (e:MouseEvent) => {this.onOverAddMessageHandler(e)};
        this._callOutAddMessage = (e:MouseEvent) => {this.onOutAddMessageHandler(e)};
        this._messageButton.nativeElement.addEventListener('click', this._callClickAddMessage);
        this._messageButton.nativeElement.addEventListener('mouseover', this._callOverAddMessage);
        this._messageButton.nativeElement.addEventListener('mouseout', this._callOutAddMessage);
    }

    public ngOnDestroy():void{
        super.ngOnDestroy();

        if(this._subLoadTweet){
            this._subLoadTweet.unsubscribe();
        }

        if(this._subLoadMessages){
            this._subLoadMessages.unsubscribe();
        }

        this._backButton.nativeElement.removeEventListener('click', this._callClickBack);
        this._tweet.nativeElement.removeEventListener('click', this._callClickTweet);
        this._messageButton.nativeElement.removeEventListener('click', this._callClickAddMessage);
        this._messageButton.nativeElement.removeEventListener('mouseover', this._callOverAddMessage);
        this._messageButton.nativeElement.removeEventListener('mouseout', this._callOutAddMessage);

        this._callClickBack = null;
        this._callClickTweet = null;
        this._callClickAddMessage = null;
        this._callOverAddMessage = null;
        this._callOutAddMessage = null;
    }

    private loadTweetHandler(res:Response):void{
        this._tweetEntity = new TwitteEntities(res);
        this._spanFollow.nativeElement.style.visibility = this._tweetEntity.isFollow ? 'visible' : 'hidden';
        this._spanTag.nativeElement.style.visibility = this._tweetEntity.hashtags.length > 0 ? 'visible' : 'hidden'; 
        
        this._subLoadTweet.unsubscribe();
    }

    private loadTweetErrorHandler(err:HttpErrorResponse):void{
        console.log('loadTweetErrorHandler');
        console.log(err);
        this.targetHtml.style.visibility = 'hidden';
        this._subLoadTweet.unsubscribe();
    }

    private loadMessagesHandler(res:Response):void{
        let aResult:any = res;
        let listMessages:Array<MessageEntities> = new Array<MessageEntities>();
        for(let i:number = 0; i < aResult.length; i++){
            listMessages.push(new MessageEntities(aResult[i]));
        }
        this._listMessages = listMessages;

        this._subLoadMessages.unsubscribe();
    }

    private loadMessagesErrorHandler(err:HttpErrorResponse):void{
        console.log('loadMessagesErrorHandler');
        console.log(err);
        this.targetHtml.style.visibility = 'hidden';
        this._subLoadMessages.unsubscribe();
    }

    private onClickBackHandler(e:MouseEvent):void{
        window.history.back();
    }

    private onClickTweetHandler(e:MouseEvent):void{
        window.open('https://twitter.com/user/status/' + this._tweetEntity.id,'_blank');
    }

    private onClickAddMessageHandler(e:MouseEvent):void{
        console.log('onClickAddMessageHandler');
    }

    private onOverAddMessageHandler(e:MouseEvent):void{
        this._tweet.nativeElement.removeEventListener('click', this._callClickTweet);
    }

    private onOutAddMessageHandler(e:MouseEvent):void{
        this._tweet.nativeElement.addEventListener('click', this._callClickTweet);
    }

}