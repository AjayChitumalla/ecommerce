import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from'angular2-flash-messages';
import {Router} from '@angular/router'
import { DataService } from '../../../data.service';
@Component({
  selector: 'app-usrreg',
  templateUrl: './usrreg.component.html',
  styleUrls: ['./usrreg.component.sass']
})
export class UsrregComponent implements OnInit {
  firstname="";
  lastname="";
  email="";
  password="";
  toggleit=false;
  constructor(public data:DataService,public flashMessage:FlashMessagesService,private route:Router) { }

  ngOnInit() {
  }
  valid(){
    if(this.firstname!="" && this.password!="" && this.lastname!="" && this.password!="")
      return true;
    return false;
  }
  eventclick(){
    this.toggleit=!this.toggleit;
    console.log(this.toggleit);
  }
  showflash(d){
    this.flashMessage.show(d.msg,{cssClass:'alert-success',timeout:5000});
  }
  showerr(d){
    this.flashMessage.show(d.msg,{cssClass:'alert-danger',timeout:5000});
  }
  onsubmit(){
    this.data.signup(this.firstname,this.lastname,this.email,this.password).subscribe(d=>{
      this.showflash(d);
    },err=>{
      this.showerr(err.error);
    })
  }
}
