import { Http } from '@angular/http';
import { SpotData } from '../../../Services/spotifyData.service';
import { AuthService } from './../../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  constructor(private authService: AuthService, 
              private spotData: SpotData, 
              private http: Http) { }

  
  albums: any[];


  ngOnInit() {

    this.spotData.getFeatured()
        .subscribe(
          (res) => this.albums = res.playlists.items
        )
  }

}
