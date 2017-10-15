import { Router } from '@angular/router';
import { AuthService } from './authentication.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class SpotData{

    constructor(private http: Http, private authService: AuthService, private router: Router){}

    featured: any[];
    newReleased: any[];
    moods: any[];
    imageUrl;
    token = this.authService.getToken();

    header = new RequestOptions({
        headers: new Headers( {
            Authorization: 'Bearer ' + this.token
        } )
    } )


     getTracks(url: string){

         return this.http.get(url, this.header)
                         .map(res => res.json())
                         .catch(err => {
                             this.authService.removeToken();                             
                             this.authService.successfulLogin = false;
                             this.router.navigate(['/'])
                             return Observable.throw(err)
                         })
     }


     getArtistInfo(url: string){

         return this.http.get(url, this.header)
                         .map(res => res.json())
                         .catch(err => Observable.throw(err))
     }

}