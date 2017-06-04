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
              private http: Http) { }

   albums :any[];
   header = this.spotData.header


  ngOnInit() {
    this.fetchData();
  }


  fetchData(){

    if(!this.spotData.newReleased){

                        this.spotData.getNewReleases()
                            .subscribe(res => {
                              this.albums = res.albums.items;
                              console.log(this.albums)
                              this.spotData.newReleased = res.albums.items;
                            })
               }         
    // } else {
    //   this.albums = this.spotData.newReleased;
    // }
  }

}
