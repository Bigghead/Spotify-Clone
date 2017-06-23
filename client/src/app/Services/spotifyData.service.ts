import { AuthService } from './authentication.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()

export class SpotData{

    constructor(private http: Http, private authService: AuthService){}

    featured: any[];
    newReleased: any[];
    moods: any[];
    imageUrl;

    header = new RequestOptions({
        headers: new Headers({
            Authorization: 'Bearer ' + this.authService.token
        })
    })


    getNewReleases(){

        return this.http.get('https://api.spotify.com/v1/browse/new-releases', this.header)
                 .map(res => res.json())
                 .catch(err => {
                     console.log(err);
                    return Observable.throw(err);
                 })
    }


    getFeatured(){
        
        return this.http.get('https://api.spotify.com/v1/browse/featured-playlists', this.header)
                 .map(res => res.json())
                 .catch(err => {
                     console.log(err);
                    return Observable.throw(err);
                 })
    
     }


     getMoods(){

         return this.http.get('https://api.spotify.com/v1/browse/categories', this.header)
                  .map(res => res.json())
                  .catch(err => Observable.throw(err))

     }


     getTracks(url: string){

         return this.http.get(url, this.header)
                         .map(res => res.json())
                         .catch(err => {
                             this.authService.successfulLogin = false;
                             return Observable.throw(err)
                         })
     }


     getArtistInfo(url: string){

         return this.http.get(url, this.header)
                         .map(res => res.json())
                         .catch(err => Observable.throw(err))
     }

}