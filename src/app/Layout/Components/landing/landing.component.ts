import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }
  dis:String;
  ngOnInit() {
    this.dis="none";
  }
  disp(){
    if(this.dis=="none")
      this.dis="block";
    else
      this.dis="none";
  }

}
