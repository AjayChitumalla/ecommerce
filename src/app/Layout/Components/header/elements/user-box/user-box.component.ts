import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  constructor(public globals: ThemeOptions,private route:Router) {
  }

  ngOnInit() {
  }
 log(){
   localStorage.clear();
   this.route.navigate(['/admin/login']);
 }
}
