import { SearchService } from './../../../Services/search.service';
import { SpotData } from './../../../Services/spotifyData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, 
              private router: Router, 
              public searchService: SearchService) { }

  
  isActive: string;
  term: string;

  ngOnInit() {

   
  }


  makeActive(tab: string){

    this.isActive = tab;
  }

}
