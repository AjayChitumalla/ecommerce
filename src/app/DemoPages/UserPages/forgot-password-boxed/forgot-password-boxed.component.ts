import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-password-boxed',
  templateUrl: './forgot-password-boxed.component.html',
  styles: []
})
export class ForgotPasswordBoxedComponent implements OnInit {
  email="";
  constructor(public data:DataService,public flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }
  valid(){
    if(this.email!="")
      return true;
    return false;
  }
  showflash(d){
    this.flashMessage.show(d.msg,{cssClass:'alert-success',timeout:5000});
  }
  showerr(d){
    this.flashMessage.show(d.msg,{cssClass:'alert-danger',timeout:5000});
  }
  onsubmit(){
    this.data.reset(this.email).subscribe(d=>{
      this.showflash(d);
    },
    err=>{
        this.showerr(err.error);
    })
  }
}
