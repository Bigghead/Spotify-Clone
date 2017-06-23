import { MusicPlayerService } from './../../../Services/musicPlayer.service';
import { SpotData } from './../../../Services/spotifyData.service';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  constructor(private currentRoute: ActivatedRoute,
    private http: Http,
    private spotData: SpotData,
    private musicPlayer: MusicPlayerService) { }


  imageUrl;
  tracks;
  musicData;
  playlistArray;
  currentIndex;
  audio;
  currentlyPlaying;
  paramsSub;

  artistPlaylist: boolean = false;


  ngOnInit() {

    this.imageUrl = this.spotData.imageUrl;

    this.getActiveTrack();

    this.paramsSub = this.currentRoute.params.subscribe(
      (params) => {

        //if coming for an artist's searched tracks
        if(params['artist']){ 
          this.artistPlaylist = true;
          const term = params['searchTerm'];
          return this.getArtistTracks(term);
         }

         //if coming for an album's playlist
        if (params['albumOrPlaylist'] === 'album') {

          const albumId = params['albumId'];
          this.getAlbumTracks(albumId);
         
         //if coming from spotify's featured playlists
        } else if (params['albumOrPlaylist'] === 'playlist'){

          const id = params['albumId'];
          
          if(params['ownerId']){
            return this.getOwnerPlaylist(id, params['ownerId'])
          }
          this.getPlaylistTracks(id);
        }
      }
    )
  }


  ngOnDestroy(){

    if(this.currentlyPlaying){this.currentlyPlaying.unsubscribe();}
    this.paramsSub.unsubscribe();
  }



  playTrack(id: string, i:number) {

    this.currentIndex = i;
    this.playlistArray.forEach((track, index) => {

        if (track.id === id) {

          this.musicPlayer.currentlyPlayingIndex = index;

          this.musicPlayer.imageUrl.next(this.playlistArray[index].image);
          this.musicPlayer.musicUrl.next(this.playlistArray[index].preview);

        }

      });

  }


  getAlbumTracks(id: string){

     this.spotData.getTracks(`https://api.spotify.com/v1/albums/${id}/tracks?market=US`)
            .subscribe(
            res => {

              this.tracks = res.items;

              this.playlistArray = res.items.filter(track => track.preview_url != null)
                .map(track => {
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


  getPlaylistTracks(id: string){
    //spotify:user:1238319959:playlist:7tVcSv0g7RxVcYcOhNwsgP
     this.spotData.getTracks(`https://api.spotify.com/v1/users/spotify/playlists/${id}/tracks?market=US`)
            .subscribe(
            res => {

              this.tracks = res.items.map(track => track.track);
              
              this.playlistArray = this.tracks.filter(track => track.preview_url != null)
                .map(track => {
                  return {
                    id: track.id,
                    preview: track.preview_url,
                    image: track.album.images[0].url
                  }
                })

              this.musicPlayer.setPlaylist(this.playlistArray);

            }
            )
  }


  getOwnerPlaylist(playlistId, ownerId){

     this.spotData.getTracks(`https://api.spotify.com/v1/users/${ownerId}/playlists/${playlistId}/tracks?market=US`)
            .subscribe(
            res => {

              this.tracks = res.items.map(track => track.track);
              
              this.playlistArray = this.tracks.filter(track => track.preview_url != null)
                .map(track => {
                  return {
                    id: track.id,
                    preview: track.preview_url,
                    image: track.album.images[0].url
                  }
                })

              this.musicPlayer.setPlaylist(this.playlistArray);

            }
            )
  }


  getArtistTracks(term: string){

     return this.spotData.getTracks(`https://api.spotify.com/v1/search?q=${term}&type=track`)
                       .subscribe(
                          res => {
                            this.tracks = res.tracks.items.filter(track => {
                              return track.preview_url != null;
                            });

                            this.playlistArray = this.tracks.filter(track => track.preview_url != null)
                             .map(track => {
                              return {
                               id: track.id,
                               preview: track.preview_url,
                               image: track.album.images[0].url
                              }
                            })

                        this.musicPlayer.setPlaylist(this.playlistArray);
       })
  }


  makeActive(index: number){

    this.currentIndex = index;
  }


 getActiveTrack(){


   this.currentlyPlaying =  this.musicPlayer.currentIndex
                    .subscribe( res => {
                      // this.currentIndex = res
                      for(let i = this.currentIndex; i < this.tracks.length; i ++){
                          if( this.tracks[i + 1] && this.tracks[i + 1].preview_url != null){
                           this.currentIndex = i + 1;
                           break;
                        }
                      }
                    })

 }


}
