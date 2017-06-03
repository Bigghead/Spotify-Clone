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

    this.authService.moods 
        .subscribe(
          res => {
            this.spotData.getMoods()
                .subscribe(
                  (res) => {
                    this.albums = res.categories.items;
                  }
                )
          }
        )
  }

}
