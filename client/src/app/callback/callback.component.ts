import { AuthService } from './../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, 
              private router: Router, 
              private authService: AuthService) { }

  

  ngOnInit() {
    
    this.currentRoute.fragment
                     .subscribe(
                       (fragment) => {
                         let token: string = fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
                         this.authService.setToken(token);
                         this.router.navigate(['home/browse/new-releases']);
                       }
                     )
  }

}
