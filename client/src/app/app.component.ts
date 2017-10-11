import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { Keys } from '../Keys'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http: Http){}

  title = 'app works!';

  ngOnInit(){
  }
}
