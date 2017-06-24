import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService{

    constructor(){}

    token: string;
    user = new ReplaySubject<any>(5);
    hasLoggedIn = new ReplaySubject<boolean>();
    featured = new ReplaySubject<boolean>();
    moods    = new ReplaySubject<boolean>();
    successfulLogin: boolean;    


    setToken(token: string){

        this.token = token;
        // this.user.next(true);
        localStorage.setItem('id_token', this.token)
    }

    isLoggedIn(){
        return localStorage.id_token != null;
    }

    getToken(){
        return localStorage.getItem('id_token');
    }

    removeToken(){
        return localStorage.removeItem('id_token')
    }


}