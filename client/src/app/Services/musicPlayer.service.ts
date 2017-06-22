import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';

export class MusicPlayerService{


    musicUrl = new ReplaySubject<string>();
    currentTrack = new ReplaySubject<any>();
    imageUrl = new ReplaySubject<any>();
    //from playlist to footer
    pauseSong = new ReplaySubject<any>();
    playPausedSong = new ReplaySubject<any>();

    //from footer to playlist
    pauseCurrent = new ReplaySubject<any>();
    playCurrent  = new ReplaySubject<any>();
    currentIndex = new ReplaySubject<any>();
    currentPlaylist = [];
    currentlyPlayingIndex;


    setPlaylist(playlistArray){

        this.currentPlaylist = playlistArray;
    }


   playNext(){

       if(this.currentlyPlayingIndex < this.currentPlaylist.length - 1){

           const currentlyPlaying = this.currentPlaylist[this.currentlyPlayingIndex + 1];

           this.musicUrl.next(currentlyPlaying.preview);
           this.imageUrl.next(currentlyPlaying.image);

           this.currentlyPlayingIndex ++;
           this.currentIndex.next(this.currentlyPlayingIndex);
       }

   }


   playPrev(){

        if(this.currentlyPlayingIndex > 0){

            const currentlyPlaying = this.currentPlaylist[this.currentlyPlayingIndex - 1];

            this.musicUrl.next(currentlyPlaying.preview);
            this.imageUrl.next(currentlyPlaying.image)

            this.currentlyPlayingIndex --;
        }

   }

    
}