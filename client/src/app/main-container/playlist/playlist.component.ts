import { MusicPlayerService } from './../../Services/musicPlayer.service';
import { SpotData } from './../../Services/spotifyData.service';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, 
              private http: Http, 
              private spotData: SpotData,
              private musicPlayer: MusicPlayerService) { }


album; 
tracks;
musicData;


  ngOnInit() {

    this.album = this.spotData.trackOrAlbum;
    this.currentRoute.params.subscribe(
      (params) => {
        
        const albumId = params['albumId'];
        
        this.spotData.getTracks(albumId)
                     .subscribe(
                       res => {

                         this.tracks = res.items;
                         console.log(this.tracks);

                       }
                     )
      }
    )
  }


  playTrack(url: string){

    this.musicPlayer.musicUrl.next(url);
  }


}
