import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {

  constructor(public data:DataService,private route:ActivatedRoute,public flashMessage : FlashMessagesService) { }

  ngOnInit() {
  }
  id=this.route.snapshot.params.id;
  password="";
  repassword="";
  valid(){
    if(this.password!="" && this.repassword!="")
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
    this.data.newpassword(this.password,this.id).subscribe(d=>{
      this.showflash(d);
    },
    err=>{
        this.showerr(err.error);
    })
  }
}
