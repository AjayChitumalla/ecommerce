import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { shallowEqualArrays } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})
export class LoginBoxedComponent implements OnInit {
  email="";password="";
  constructor(private route:Router,public flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }
  valid(){
    if(this.email!="" && this.password!="")
    return true;
    return false;
  }
  showerr(){
    this.flashMessage.show("Invalid Email or Password",{cssClass:'alert-danger',timeout:5000});
  }
  onsub(){
    if(this.email=="abc@gmail.com" && this.password=="abcd"){
      localStorage.setItem('log','asdcxz');
      this.route.navigate(['/admin']);
    }
    else
      this.showerr();
  }
}
