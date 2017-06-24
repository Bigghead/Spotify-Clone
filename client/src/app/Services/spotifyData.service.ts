import { Router } from '@angular/router';
import { AuthService } from './authentication.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()

export class SpotData{

    constructor(private http: Http, private authService: AuthService, private router: Router){
        console.log(this.authService.getToken())
    }

    featured: any[];
    newReleased: any[];
    moods: any[];
    imageUrl;
    token = this.authService.getToken();

    header = new RequestOptions({
        headers: new Headers({
            Authorization: 'Bearer ' + this.token
        })
    })


    getNewReleases(){

        return this.http.get('https://api.spotify.com/v1/browse/new-releases', this.header)
                 .map(res => res.json())
                 .catch(err => {
                     console.log(err);
                     this.authService.removeToken();
                     this.router.navigate(['/'])
                    return Observable.throw(err);
                 })
    }


    getFeatured(){
        
        return this.http.get('https://api.spotify.com/v1/browse/featured-playlists', this.header)
                 .map(res => res.json())
                 .catch(err => {
                     console.log(err);
                     this.authService.removeToken();
                     this.router.navigate(['/'])
                    return Observable.throw(err);
                 })
    
     }


     getMoods(){

         return this.http.get('https://api.spotify.com/v1/browse/categories', this.header)
                  .map(res => res.json())
                  .catch(err => {
                      this.authService.removeToken();
                      this.router.navigate(['/'])
                     return  Observable.throw(err)
                  })

     }


     getTracks(url: string){

         return this.http.get(url, this.header)
                         .map(res => res.json())
                         .catch(err => {
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