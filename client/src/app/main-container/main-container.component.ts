import { AuthService } from './../Services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
