import { AuthService } from './../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { Http } from '@angular/http'
import { Keys } from '../../../Keys'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router, private http: Http, private authService: AuthService) { }

  user;

  ngOnInit() {

    this.authService.user.subscribe(
      (res) => this.user = res
    )
  }

  logIn(){
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${Keys.spotId}&response_type=token&redirect_uri=${Keys.callback}`;
    
}

}
