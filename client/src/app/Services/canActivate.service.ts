import { AuthService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';


@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(){
        return this.authService.isLoggedIn();
    }

    canActivateChild(){
        
        if(this.authService.isLoggedIn()){
            return true;
        } else {
            return this.router.navigate(['/']);
        }
    }
}