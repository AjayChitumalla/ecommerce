import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.sass']
})
export class DonationComponent implements OnInit {
  image;
  name="";
  quantity;
  desc="";
  cat="";
  user;
  constructor(public data:DataService,public flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user['Address']){
      this.user['Address']={};
      this.user['Address']['firstname']="";
      this.user['Address']['lastname']=""; 
      this.user['Address']['street']="";
      this.user['Address']['city']=""; 
      this.user['Address']['state']="";
      this.user['Address']['pin']=0;
      this.user['Address']['phone']=0
    }
    console.log(this.user);
  }
  selectImg(event){
    if(event.target.files.length>0){
      var file = event.target.files[0];
      this.image=file;
      console.log(this.image);
    }
  }
  imgsub(){
    const formdata = new FormData();
    formdata.append('file',this.image);
    this.data.addfile(formdata).subscribe(d=>{
      console.log(d);
    })
  }
  showflash(){
    this.flashMessage.show("Request received Successfully!",{cssClass:'alert-success',timeout:3000});
  }
  showerr(e){
    this.flashMessage.show(e.msg,{cssClass:'alert-danger',timeout:3000});
  }
  sub(){
    var Time=new Date().toLocaleString();
    this.data.donate(this.name,this.desc,this.cat,this.quantity,this.image.name,Time,this.user,"Request Received").subscribe(d=>{
      this.showflash();
      console.log(d);
      var product = {
        Name:this.name,
        Description:this.desc,
        Category:this.cat,
        Quantity:this.quantity,
        Image:this.image.name,
        Time:new Date().toLocaleString(),
        Status:"Request Received"
      }
      this.name="";
      this.quantity=0;
      this.desc="";
      this.image='';
      this.cat="";
      var user = localStorage.getItem('uid');
      console.log(this.user['Address']);
      this.data.updateDonation(user,d,this.user['Address']).subscribe(d=>{
        localStorage.setItem('user',JSON.stringify(d));
      },
      err=>{
        if(err instanceof HttpErrorResponse){
        if(err.status === 403){
          this.showerr(err.error);
        }
      }
      })
    },
    err=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 403){
          this.showerr(err.error);
        }
      }
    })
  }
  valid(){
    if(this.name!="" && this.quantity && this.desc!="" && this.image && this.cat!="" && 
                      this.user['Address']['firstname']!="" && this.user['Address']['lastname']!="" && 
                      this.user['Address']['street']!="" && this.user['Address']['city']!="" && 
                      this.user['Address']['state']!="" && this.user['Address']['pin']!=0 && 
                      this.user['Address']['phone']!=0){
        return true;
    }
    return false;
  }
}
