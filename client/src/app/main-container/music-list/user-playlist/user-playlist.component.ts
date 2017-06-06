import { MusicPlayerService } from './../../../Services/musicPlayer.service';
import { SpotData } from './../../../Services/spotifyData.service';
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

        const id = params['id'];

        this.spotData.getTracks('https://api.spotify.com/v1/users/spotify/playlists/37i9dQZF1DX4WYpdgoIcn6/tracks')
          .subscribe(
          res => {

            console.log(res);
            this.tracks = res.items;
            console.log(this.tracks);

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
