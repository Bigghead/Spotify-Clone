import { NewReleasesComponent } from './new-releases/new-releases.component';
import { SpotData } from './../../Services/spotifyData.service';
import { AuthService } from './../../Services/authentication.service';
import { Component, OnInit, Injectable } from '@angular/core';


@Injectable()

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  constructor(private authService: AuthService, private spotData: SpotData) { }


  hasLoggedIn: boolean = false;
  isActive: string = 'New';
  

  ngOnInit() {

    this.authService.user
                    .subscribe(

                      res => {
                        console.log(res);
                        this.hasLoggedIn = res;
                      })

  }


  makeActive(tab: string){

    this.isActive = tab;
  }

}
