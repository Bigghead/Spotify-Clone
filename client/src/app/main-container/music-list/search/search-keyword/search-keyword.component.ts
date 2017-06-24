import { SearchService } from './../../../../Services/search.service';
import { Subject } from 'rxjs/Subject';
import { SpotData } from './../../../../Services/spotifyData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.css']
})
export class SearchKeywordComponent implements OnInit, OnDestroy {

  constructor(private currentRoute: ActivatedRoute, 
              private spotData: SpotData, 
              private router: Router, 
              private search: SearchService) { }


  results; 
  searchType: string;
  paramsSub;

  ngOnInit() {

    const resultType = {
      'artist': 'artists', 
      'album' : 'albums', 
      'playlist': 'playlists'
    }

     this.paramsSub = this.currentRoute.params
                     .subscribe(
                       (params) => {
                         
                         const term = params['searchTerm'];
                         const type = params['searchType'];

                         this.searchType = type;
                         this.search.searchTerm = term;

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

  getPlaylistTracks(image: string, ownerId:string, id: string){

    this.spotData.imageUrl = image;
    this.router.navigate([this.searchType, id, ownerId ])
  }

  getArtist(id: string){

    this.router.navigate(['/search', 'artist', id])
  }

  ngOnDestroy(){

    this.paramsSub.unsubscribe();
  }

}
