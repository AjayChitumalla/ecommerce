import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.sass']
})
export class MyordersComponent implements OnInit {
  donations;
  url=[];
  url1;
  constructor(public data:DataService,private domsanitizer:DomSanitizer) { }

  ngOnInit() {
    localStorage.setItem('page','myDonations');
    this.data.getuser(localStorage.getItem('uid')).subscribe(d=>{
      console.log(d,d['Donations']);
      this.donations=d['Donations'];
      this.func();
    })
  }
  func(){
    for(var i=0;i<this.donations.length;i++){
      this.url1=this.domsanitizer.bypassSecurityTrustUrl(this.data.serverUrl+'/images/'+this.donations[i].Image);
      console.log(this.url1);
      this.url.push(this.url1);
    }
  }
}
