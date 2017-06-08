import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';

export class MusicPlayerService{


    musicUrl = new ReplaySubject<string>();
    currentTrack = new ReplaySubject<any>();
    imageUrl = new ReplaySubject<any>();

    currentPlaylist = [];


    setPlaylist(playlistArray){

        this.currentPlaylist = playlistArray.filter( track => track.preview_url != null)
    }
}