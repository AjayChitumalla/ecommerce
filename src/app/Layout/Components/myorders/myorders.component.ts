import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.sass']
})
export class MyordersComponent implements OnInit {
  cartItems;
  url=[];
  url1;
  user={};
  constructor(public data:DataService,private domsanitizer:DomSanitizer) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('page','myorders');
    this.cartItems=this.user['Items'];
    for(var i=0;i<this.cartItems.length;i++){
      this.url1=this.domsanitizer.bypassSecurityTrustUrl(this.data.serverUrl+'/images/'+this.cartItems[i].Image);
      this.url.push(this.url1);
    }
  }

}
