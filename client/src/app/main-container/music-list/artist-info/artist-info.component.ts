import { ActivatedRoute, Router } from '@angular/router';
import { MusicPlayerService } from '../../../Services/musicPlayer.service';
import { SpotData } from './../../../Services/spotifyData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.css']
})
export class ArtistInfoComponent implements OnInit {

  constructor(private spotData: SpotData, 
              private currentRoute: ActivatedRoute,
              private musicPlayer: MusicPlayerService, 
              private router: Router) { }

  artistInfo;
  artistTracks: any[] = [];
  artistAlbums: any[] = [];

  ngOnInit() {

    this.currentRoute.params
        .subscribe( params => {

          const artistId = params['artistId'];
          this.getInfo(artistId);
          this.getArtistTracks(artistId);
          this.getArtistAlbums(artistId);
          
        } )
  }


  getInfo(id: string){

    return this.spotData.getArtistInfo(`https://api.spotify.com/v1/artists/${id}`)
               .subscribe(
                 (res) => {
                   this.artistInfo = res;
                 }
               )
  }


  getArtistTracks(id: string){

    return this.spotData.getTracks(`https://api.spotify.com/v1/artists/${id}/albums?album_type=single`)
               .subscribe(
                 res => {

                   const filterSameSongs = {

                   }
                    res.items.forEach( single => {
                      if( !filterSameSongs[single.name] ){
                        filterSameSongs[single.name] = 1;
                        this.artistTracks.push(single);
                      }
                    } )
                 }
               )
    // return this.spotData.getTracks(`https://api.spotify.com/v1/tracks/4vb4mFvYsr2h6enhjJsq9Y`)
    //                     .subscribe( res => console.log(res))
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
                   } )
                 }
               )
  }


  getPlaylist(image: string, id: string){

    // this.musicPlayer.imageUrl.next(image);
    this.router.navigate(['/album', id])
  }

}
