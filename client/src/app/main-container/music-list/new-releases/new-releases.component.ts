import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { SpotData } from '../../../Services/spotifyData.service';
import { AuthService } from './../../../Services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  constructor(private authService: AuthService, 
              private spotData: SpotData, 
              private http: Http, 
              private router : Router) { }

   albums :any[];
   header = this.spotData.header;
   


  ngOnInit() {
    this.fetchData();
  }


  fetchData(){

    if(!this.spotData.newReleased){

                        this.spotData.getNewReleases()
                            .subscribe(res => {
                              this.albums = res.albums.items.filter( album => album.images.length > 0);
                              this.spotData.newReleased = this.albums;
                            })
               }  else {
      this.albums = this.spotData.newReleased;
    }

  }


  passAlbumData(album, imageUrl){

    this.router.navigate(["/album", album.id])

  }

}
