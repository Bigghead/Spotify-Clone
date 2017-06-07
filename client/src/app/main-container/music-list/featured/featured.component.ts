import { AuthService } from './../../../Services/authentication.service';
import { SpotData } from './../../../Services/spotifyData.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  constructor(private authService: AuthService, 
              private spotData: SpotData, 
              private http: Http, 
              private router: Router) { }

  
  albums: any[];


  ngOnInit() {

    this.fetchData();
  }


  fetchData(){

    if(!this.spotData.featured){

                        this.spotData.getFeatured()
                            .subscribe(res => {
                              this.albums = res.playlists.items;
                              this.spotData.featured = res.playlists.items;
                            })
  
    } else {
      this.albums = this.spotData.featured;
    }
  }


  getPlaylistData(id: string, imageUrl: string){
  
    this.spotData.imageUrl = imageUrl;
    this.router.navigate(['/home/user/spotify/playlist/', id]);
}

}


