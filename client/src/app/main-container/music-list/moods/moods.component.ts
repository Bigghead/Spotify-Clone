import { SpotData } from './../../../Services/spotifyData.service';
import { AuthService } from './../../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.css']
})
export class MoodsComponent implements OnInit {

  constructor(private authService: AuthService, 
              private spotData: SpotData) { }

  
  albums :any[];


  ngOnInit() {
    this.fetchData();
  }


  fetchData(){

    if(!this.spotData.moods){
    this.authService.hasLoggedIn
                    .subscribe(

                      res => {

                        this.spotData.getMoods()
                            .subscribe(res => {
                              this.albums = res.categories.items;
                              this.spotData.moods = res.categories.items;
                            })
                                     
                      })
    } else {
      this.albums = this.spotData.moods;
    }
  }

}
