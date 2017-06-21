import { Subject } from 'rxjs/Subject';
import { SpotData } from './../../../../Services/spotifyData.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css']
})
export class SearchArtistComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, 
              private spotData: SpotData) { }


  results; 

  ngOnInit() {

    const resultType = {
      'artist': 'artists', 
      'album' : 'albums', 
      'playlist': 'playlists'
    }

     this.currentRoute.params
                     .subscribe(
                       (params) => {
                         
                         const term = params['searchTerm'];
                         const type = params['searchType'];


                         this.spotData.getTracks(`https://api.spotify.com/v1/search?q=${term}&type=${type}`)
                             .subscribe(
                               res => {
                                 console.log(res);
                                 this.results = res[resultType[type]].items
                                                   .filter(artist => artist.images.length > 0);
                               }
                             )
                       }
                     )
  }


 

}
