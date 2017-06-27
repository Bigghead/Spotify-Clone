import { Observable } from 'rxjs/Observable';
import { MusicPlayerService } from './../../../Services/musicPlayer.service';
import { SpotData } from './../../../Services/spotifyData.service';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/zip';

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


  imageUrl: string;
  playlistUrl: string;
  tracks: any[];
  musicData;
  playlistArray;
  currentIndex;
  audio;

  //Subs
  nextIndex;
  prevIndex
  paramsSub;

  artistPlaylist: boolean = false;


  ngOnInit() {

    this.getActiveTrack();

    this.paramsSub = this.currentRoute.params.subscribe(
      (params) => {

        //if coming from clicking on footer playlist to go back to current playing playlist
        if(params['currentIndex']){
          this.currentIndex = this.musicPlayer.playlistIndex;
        }

        //if coming for an artist's searched tracks
        if(params['artist']){ 
        
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
          this.playlistUrl = `playlist/${id}`;
          

          //if playlist is made by a user
          if(params['ownerId']){
            const ownerId = params['ownerId'];
            this.playlistUrl = `playlist/${id}/${ownerId}`;            
            return this.getPlaylistTracks(
              id,
              `https://api.spotify.com/v1/users/${ownerId}/playlists/${id}`, 
              `https://api.spotify.com/v1/users/${ownerId}/playlists/${id}/tracks?market=US`)

          }
          this.getPlaylistTracks(id, `https://api.spotify.com/v1/users/spotify/playlists/${id}`, `https://api.spotify.com/v1/users/spotify/playlists/${id}/tracks?market=US`);
        }
      }
    )
  }


  ngOnDestroy(){

    if(this.nextIndex){this.nextIndex.unsubscribe();}
    this.paramsSub.unsubscribe(); 
  }


  playTrack(id: string, i:number) {

    this.currentIndex = i;
    this.musicPlayer.setPlaylist(this.playlistArray);    
    this.playlistArray.forEach((track, index) => {

        if (track.id === id) {

          this.musicPlayer.currentlyPlayingIndex = index;

          this.musicPlayer.imageUrl.next(this.playlistArray[index].image);
          this.musicPlayer.musicUrl.next(this.playlistArray[index].preview);
          this.musicPlayer.playlistUrl.next(this.playlistUrl);
          this.musicPlayer.playlistIndex = this.currentIndex;
        }

      });

  }


  getAlbumTracks(id: string){

    this.playlistUrl = `album/${id}`;

    let albumData   = this.spotData.getTracks(`https://api.spotify.com/v1/albums/${id}`);
    let albumTracks = this.spotData.getTracks(`https://api.spotify.com/v1/albums/${id}/tracks?market=US`);

    return Observable.zip(albumData, albumTracks)
                     .subscribe(results => {
                       this.imageUrl = results[0].images[0].url;

                        this.tracks = results[1].items;

                        this.playlistArray = results[1].items
                                                       .filter(track => track.preview_url != null)
                                                       .map(track => {
                                                             return {
                                                              id: track.id,
                                                              preview: track.preview_url,
                                                              image: this.imageUrl
                                                            }
                                                         })

                     })
  }


  getPlaylistTracks(id: string, url1, url2){
    //spotify:user:1238319959:playlist:7tVcSv0g7RxVcYcOhNwsgP
   
      let playlistData  = this.spotData.getTracks(url1);
      let playlistTracks = this.spotData.getTracks(url2);
      
      return Observable.zip(playlistData, playlistTracks)
                       .subscribe( results => {
                         
                         this.imageUrl = results[0].images[0].url;
                         
                         this.tracks = results[1].items.map(track => track.track);
              
                         this.playlistArray = this.tracks.filter(track => track.preview_url != null)
                                                         .map(track => {
                                                             return {
                                                               id: track.id,
                                                               preview: track.preview_url,
                                                               image: track.album.images[0].url
                                                              }
                                                          })

                       })
}


  getArtistTracks(term: string){

    this.playlistUrl = `search/${term}/track/artist/`;
    this.artistPlaylist = true;

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

       })
  }


  makeActive(index: number){

    this.currentIndex = index;
  }


 getActiveTrack(){


   this.nextIndex =  this.musicPlayer.nextIndex
                    .subscribe( res => {
                      // this.currentIndex = res
                      if(this.tracks){
                         for(let i = this.currentIndex; i < this.tracks.length; i ++){
                           console.log(this.tracks[i + 1]);
                          if( this.tracks[i + 1] && this.tracks[i + 1].preview_url != null){
                           this.currentIndex = i + 1;
                           this.musicPlayer.playlistIndex = this.currentIndex;
                           break;
                        }
                      }
                      }
                    })

    this.prevIndex = this.musicPlayer.prevIndex
                         .subscribe( res => {
                            if(this.tracks){
                              for(let i = this.tracks.length; i >= this.currentIndex; i --){
                                if( this.tracks[this.currentIndex - 1] && this.tracks[this.currentIndex - 1].preview_url != null){
                                 this.currentIndex = this.currentIndex - 1;
                                 this.musicPlayer.playlistIndex = this.currentIndex;
                                 break;
                                }
                              }
                           }
                         })

 }


}
