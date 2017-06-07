import { SpotData } from './../../../../Services/spotifyData.service';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mood-playlist',
  templateUrl: './mood-playlist.component.html',
  styleUrls: ['./mood-playlist.component.css']
})
export class MoodPlaylistComponent implements OnInit {

  constructor(private http: Http, 
              private currentRoute: ActivatedRoute, 
              private spotData: SpotData, 
              private router: Router) { }


  results;

  
  ngOnInit() {

    this.currentRoute.params
                     .subscribe(
                       params => {

                         const moodType = params['mood'];

                         this.spotData.getTracks(`https://api.spotify.com/v1/browse/categories/${moodType}/playlists`)
                                      .subscribe(
                                        res => {
                                          this.results = res.playlists.items;
                                          console.log(this.results);
                                        })
                       }
                     )
  }


   getPlaylistData(id: string, imageUrl: string){
  
    this.spotData.imageUrl = imageUrl;
    this.router.navigate(['/home/user/spotify/playlist/', id]);
}

}
