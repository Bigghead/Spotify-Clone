import { MusicPlayerService } from './../../Services/musicPlayer.service';
import { SearchService } from './../../Services/search.service';
import { SpotData } from './../../Services/spotifyData.service';
import { AuthService } from './../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

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

  constructor( private router: Router, 
               private http: Http, 
               public authService: AuthService, 
               private searchService: SearchService, 
               private musicPlayer: MusicPlayerService) { }


  // user;
  searchForm


  ngOnInit() {

    // this.authService.user.subscribe(
    //   (res) => this.user = res
    // )
    this.initForm();
  }


  logIn(){

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${Keys.spotId}&response_type=token&redirect_uri=${Keys.callback}`;
  }


  initForm(){

    this.searchForm = new FormGroup({
      'searchTerm' : new FormControl(null)
    })
  }


  submitForm(){

    const term = this.searchForm.value.searchTerm;
    this.searchService.searchTerm = (term);
    this.searchService.activeSearchTab.next('Artists');
    this.router.navigate(['/search', term , 'artist']);
    this.searchForm.reset();
  }


  logOut(){

    this.authService.removeToken();
    this.musicPlayer.musicUrl.next(null);
    this.musicPlayer.imageUrl.next(null);
    this.router.navigate(['/'])
  }

}
