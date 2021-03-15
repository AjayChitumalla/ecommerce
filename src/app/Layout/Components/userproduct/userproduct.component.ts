import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userproduct',
  templateUrl: './userproduct.component.html',
  styleUrls: ['./userproduct.component.sass']
})
export class UserproductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem('page','products');
  }

}
