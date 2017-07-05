import { Router } from '@angular/router';
import { AuthService } from './../Services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  constructor(public authService: AuthService, 
              private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/browse/new-releases'])
    }
  }

}
