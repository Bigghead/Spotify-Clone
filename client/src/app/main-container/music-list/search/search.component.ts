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
              private router: Router) { }


  term: string;

  ngOnInit() {

    // this.router.navigate(['/search', this.term, 'artist']);
  }

}