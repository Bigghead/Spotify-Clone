import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  audio;
  playing: boolean = false;
  progress;
  progressBar: number = 0;

  ngOnInit() {


    this.audio = document.querySelector('#audio');
   
  }


  playSong(){

    this.audio.play();
     this.progress = Observable.interval(300)
                               .subscribe(
                                 res => this.progressBar += 1
                               )
          this.playing = true;

  }


  pauseSong(){

    this.audio.pause();
    this.progress.unsubscribe();
    this.playing = false;

  }

  

}
