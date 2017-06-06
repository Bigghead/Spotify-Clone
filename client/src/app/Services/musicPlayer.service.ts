import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

export class MusicPlayerService{


    musicUrl = new Subject<string>();
}