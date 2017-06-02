import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService{

    constructor(){}

    token: string;
    user = new Subject<boolean>();
    hasLoggedIn = new ReplaySubject<boolean>();
    


    setToken(token: string){

        this.token = token;
        this.user.next(true);
        this.hasLoggedIn.next(true);

    }


}