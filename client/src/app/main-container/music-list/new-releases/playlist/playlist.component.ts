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
  playlistArray;


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
            this.playlistArray = res.items.filter( track => track.preview_url != null)
                                           .map( track => {
                                             return {
                                               id: track.id, 
                                               preview: track.preview_url, 
                                               image: this.imageUrl
                                             }
                                           })
            
            this.musicPlayer.setPlaylist(this.playlistArray);

          }
          )

      }
    )
  }



  playTrack(id: string) {

    return new Promise((resolve, reject) => {
      resolve(this.playlistArray.forEach(( track , index ) => {
        if(track.id === id){
          resolve(index);
        }
      }));
    }).then((index: number) => {
      this.musicPlayer.currentlyPlayingIndex = index;

       this.musicPlayer.imageUrl.next(this.imageUrl);
       this.musicPlayer.musicUrl.next(this.playlistArray[index].preview);
    })
  }


}
