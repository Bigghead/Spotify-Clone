import { SpotData } from './../../../../Services/spotifyData.service';
import { MusicPlayerService } from './../../../../Services/musicPlayer.service';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.css']
})
export class UserPlaylistComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute,
    private http: Http,
    private spotData: SpotData,
    private musicPlayer: MusicPlayerService) { }


  imageUrl;
  tracks;

  ngOnInit() {

    this.imageUrl = this.spotData.imageUrl

    this.currentRoute.params
      .subscribe(
      params => {

        const id = params['albumId'];

        this.spotData.getTracks(`https://api.spotify.com/v1/users/spotify/playlists/${id}/tracks`)
          .subscribe(
          res => {

            console.log(res);
            this.tracks = res.items;
            console.log(this.tracks);
            this.musicPlayer.setPlaylist(res.items);
          }
          )
      }
      )
  }


   playTrack(currentTrack, url: string) {

    this.musicPlayer.imageUrl.next(currentTrack.track.album.images[0].url);
    this.musicPlayer.currentTrack.next(currentTrack);
    this.musicPlayer.musicUrl.next(url);
  }


}
