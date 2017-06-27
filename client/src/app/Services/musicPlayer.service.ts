import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';

export class MusicPlayerService{


    musicUrl     = new ReplaySubject<string>();
    currentTrack = new ReplaySubject<any>();
    imageUrl     = new ReplaySubject<any>();
    playlistUrl  = new ReplaySubject<any>();
    nextIndex    = new ReplaySubject<any>();
    prevIndex    = new ReplaySubject<any>();    

    currentPlaylist = [];
    playlistIndex : number ;
    currentlyPlayingIndex;


    setPlaylist(playlistArray){

        this.currentPlaylist = playlistArray;
    }


   playNext(){

       this.playlistIndex += 1;

       if(this.currentlyPlayingIndex < this.currentPlaylist.length - 1){

           const currentlyPlaying = this.currentPlaylist[this.currentlyPlayingIndex + 1];

           this.musicUrl.next(currentlyPlaying.preview);
           this.imageUrl.next(currentlyPlaying.image);
           this.nextIndex.next('hi');

           this.currentlyPlayingIndex ++;
       }
   }


   playPrev(){

       this.playlistIndex -= 1;

        if(this.currentlyPlayingIndex > 0){

            const currentlyPlaying = this.currentPlaylist[this.currentlyPlayingIndex - 1];

            this.musicUrl.next(currentlyPlaying.preview);
            this.imageUrl.next(currentlyPlaying.image);
            this.prevIndex.next('hi');

            this.currentlyPlayingIndex --;
        }

   }

    
}