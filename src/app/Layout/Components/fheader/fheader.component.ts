import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fheader',
  templateUrl: './fheader.component.html',
  styleUrls: ['./fheader.component.sass']
})
export class FheaderComponent implements OnInit {

  constructor(public route:Router) { }
  dis:String;
  home="";
  about="";
  products="";
  myorders="";
  ngOnInit() {
    if(localStorage.getItem("uid")){
      this.dis="block";
    }
    else
      this.dis="none";
    if(localStorage.getItem('page')=='home')
      this.home="active";
      if(localStorage.getItem('page')=='about')
      this.about="active";
      if(localStorage.getItem('page')=='products')
      this.products="active";
      if(localStorage.getItem('page')=='myorders')
      this.myorders="active";
    console.log("loaded");
  }
  loggedIn(){
    return !!localStorage.getItem('uid');
  }
  logout(){
    localStorage.removeItem('uid');
    localStorage.removeItem('user');
    localStorage.removeItem('sum');
    localStorage.removeItem('cart');
    this.route.navigate(['/']);
  }
}
