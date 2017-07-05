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

  constructor(public authService: AuthService, private spotData: SpotData) { }



  isActive: string = 'New';
  

  ngOnInit() {


  }


  makeActive(tab: string){

    this.isActive = tab;
  }

}
