import { Subject } from 'rxjs/Subject';
import { SpotData } from './../../../../Services/spotifyData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.css']
})
export class SearchKeywordComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, 
              private spotData: SpotData, 
              private router: Router) { }


  results; 
  searchType: string;

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

                         this.searchType = type;

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


  getTracks(url: string, id: string){

    this.spotData.imageUrl = url;
    this.router.navigate([this.searchType, id ])
  }

}
