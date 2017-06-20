import { ActivatedRoute } from '@angular/router';
import { SpotData } from './../../../../Services/spotifyData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-track',
  templateUrl: './search-track.component.html',
  styleUrls: ['./search-track.component.css']
})
export class SearchTrackComponent implements OnInit {

  constructor(private spotData: SpotData, 
              private currentRoute: ActivatedRoute) { }

  results;

  ngOnInit() {

    this.currentRoute.params.subscribe(
      params => {
        
         const term = params['searchTerm'];

          this.spotData.getTracks(`https://api.spotify.com/v1/search?q=${term}&type=track`)
                       .subscribe(
                          res => {
                            this.results = res.tracks.items.filter(track => {
                              return track.preview_url != null;
                            });
                            console.log(this.results)
                          })
      }
    )

   

  }

}
