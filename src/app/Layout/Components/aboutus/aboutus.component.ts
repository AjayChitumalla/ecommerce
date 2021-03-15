import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.sass']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem('page','about');
  }

}
