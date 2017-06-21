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
              private searchService: SearchService) { }

  
  isActive: string = 'Artists';
  term: string;

  ngOnInit() {

    this.isActive = 'Artists';
    this.searchService.activeSearchTab
        .subscribe(res => this.isActive = res)
   
  }


  makeActive(tab: string){

    this.isActive = tab;
  }

}
