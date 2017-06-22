import { MusicPlayerService } from './../../Services/musicPlayer.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private musicPlayer: MusicPlayerService) { }


  audio;
  playing: boolean = false;
  progress;
  progressBar: number = 0;
  musicUrl :string;
  currentTrack;
  imageUrl;


  ngOnInit() {

    this.audio = document.querySelector('#audio');
    this.audio.onended = () => {
      this.clearSong();
    }

    this.musicPlayer.pauseSong
                    .subscribe(
                      res => this.pauseSong()
                    )

    this.musicPlayer.playPausedSong
                    .subscribe(
                      res => this.playSong()
                    )

    this.musicPlayer.musicUrl
                    .subscribe(
                      res => {
                        this.musicUrl = res;
                        
                        setTimeout( () => {
                          this.clearSong();
                          this.playSong();
                        })
                      }
                    )

    this.musicPlayer.imageUrl
                    .subscribe(
                      res => this.imageUrl = res
                    )
   
  }


  playSong(){
    
    if(this.progress){
      this.progress.unsubscribe(); 
    }
    
    this.audio.play()
              .then(() => {
                 this.progress = Observable.interval(300)
                               .subscribe(
                                 res => this.progressBar += 1
                               )
                 this.playing = true;
                 this.musicPlayer.playCurrent.next(this.musicPlayer.currentlyPlayingIndex);
              })
              .catch(err => console.log(err));
   
  }


  pauseSong(){

    this.audio.pause();
    this.progress.unsubscribe();
    this.playing = false;
    this.musicPlayer.pauseCurrent.next(this.musicPlayer.currentlyPlayingIndex);

  }

  clearSong(){

      this.progressBar = 0;
      this.playing = false;
      if(this.progress){
        this.progress.unsubscribe();
      }

  }

  playNext(){

    this.musicPlayer.playNext();
  }

  playPrev(){

    this.musicPlayer.playPrev();
  }

  

}
