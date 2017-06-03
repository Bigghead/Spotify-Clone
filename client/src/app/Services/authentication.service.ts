import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService{

    constructor(){}

    token: string;
    user = new Subject<boolean>();
    hasLoggedIn = new ReplaySubject<boolean>();
    featured = new ReplaySubject<boolean>();
    moods    = new ReplaySubject<boolean>();
    


    setToken(token: string){

        this.token = token;
        this.user.next(true);
        this.hasLoggedIn.next(true);
        this.featured.next(true);
        this.moods.next(true);
    }


}