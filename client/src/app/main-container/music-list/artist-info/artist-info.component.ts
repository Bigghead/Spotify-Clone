import { ActivatedRoute } from '@angular/router';
import { SpotData } from './../../../Services/spotifyData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.css']
})
export class ArtistInfoComponent implements OnInit {

  constructor(private spotData: SpotData, 
              private currentRoute: ActivatedRoute) { }

  artistInfo;
  artistTracks;
  artistAlbums: any[] = [];

  ngOnInit() {

    this.currentRoute.params
        .subscribe( params => {

          const artistId = params['artistId'];
          this.getInfo(artistId);
          this.getArtistTracks(artistId);
          this.getArtistAlbums(artistId);
          
        })
  }


  getInfo(id: string){

    return this.spotData.getArtistInfo(`https://api.spotify.com/v1/artists/${id}`)
                       .subscribe(
                         (res) => {
                           console.log(res);
                           this.artistInfo = res;
                         }
                       )
  }


  getArtistTracks(id: string){

    return this.spotData.getTracks(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`)
               .subscribe(
                 res => {
                   this.artistTracks = res.tracks
                                          .filter( track => track.preview_url != null);
                   console.log(res);
                 }
               )
  }


  getArtistAlbums(id: string){

    return this.spotData.getTracks(`https://api.spotify.com/v1/artists/${id}/albums`)
               .subscribe(
                 res => {

                   const albumNames = {};
                   res.items.forEach( album => {
                     
                     if( !albumNames[album.name] && album.album_type !== 'single' ){
                       albumNames[album.name] = album.name;
                       this.artistAlbums.push(album);
                     }
                   })
                   console.log(this.artistAlbums);
                 }
               )
  }

}
