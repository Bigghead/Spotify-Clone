import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, private router: Router) { }

  

  ngOnInit() {
    
    this.currentRoute.fragment
                     .subscribe(
                       (fragment) => {
                         let token: string = fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
                         console.log(token);
                       }
                     )
  }

}
