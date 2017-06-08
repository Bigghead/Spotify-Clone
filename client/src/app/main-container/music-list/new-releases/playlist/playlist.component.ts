import { MusicPlayerService } from './../../../../Services/musicPlayer.service';
import { SpotData } from './../../../../Services/spotifyData.service';
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


  imageUrl;
  tracks;
  musicData;


  ngOnInit() {

    this.imageUrl = this.spotData.imageUrl;

    this.currentRoute.params.subscribe(
      (params) => {

        const albumId = params['albumId'];


        this.spotData.getTracks(`https://api.spotify.com/v1/albums/${albumId}/tracks`)
          .subscribe(
          res => {

            this.tracks = res.items;
            console.log(this.tracks);
            this.musicPlayer.setPlaylist(res.items);

          }
          )

      }
    )
  }



  playTrack(currentTrack, url: string) {

    this.musicPlayer.imageUrl.next(this.imageUrl);
    this.musicPlayer.currentTrack.next(currentTrack);
    this.musicPlayer.musicUrl.next(url);
  }


}
