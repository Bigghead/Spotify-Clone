import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  progress = 0;

  ngOnInit() {
    setInterval( () => {
      this.progress += 1;
    }, 300)
  }

  

}
