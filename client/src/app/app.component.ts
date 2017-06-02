import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { Keys } from '../Keys'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http: Http){}

  title = 'app works!';

  ngOnInit(){
    this.http.get(`https://accounts.spotify.com/authorize?client_id=${Keys.spotId}&response_type=token&redirect_uri=${Keys.callback}`)
             .map(res => res.json())
             .subscribe(
               (res) => console.log(res)
             )
  }
}
