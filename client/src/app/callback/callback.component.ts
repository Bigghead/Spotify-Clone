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
                         
                         const expiresAt = JSON.stringify((3600 * 1000) + new Date().getTime());
                         localStorage.setItem('expires_at', expiresAt);
                         let token: string = fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
                         this.authService.setToken(token);
                         this.authService.successfulLogin = true;
                         this.router.navigate(['/browse/new-releases']);
                       }
                     )
  }

}
