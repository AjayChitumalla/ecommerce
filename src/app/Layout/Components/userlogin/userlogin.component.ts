import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from '../../../data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.sass']
})
export class UserloginComponent implements OnInit {
  email="";
  password="";
  constructor(public flashMessage:FlashMessagesService,public data:DataService,private route:Router) { }

  ngOnInit() {
  }
  valid(){
    if(this.password!="" && this.password!="")
      return true;
    return false;
  }
  showflash(d){
    this.flashMessage.show(d.msg,{cssClass:'alert-success',timeout:1000});
  }
  showerr(d){
    this.flashMessage.show(d.msg,{cssClass:'alert-danger',timeout:5000});
  }
  onsubmit(){
    this.data.login(this.email,this.password).subscribe(d=>{
      this.showflash(d.body);
      localStorage.setItem('uid',d.body['token']);
      this.route.navigate(['/home']);
    },
    err=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 500 || err.status === 401){
          this.flashMessage.show('Incorrect Email or Password!!!',{cssClass:'alert-danger',timeout:5000});
        }
        if(err.status === 403){
          this.showerr(err.error);
        }
      }
    })
  }
}
