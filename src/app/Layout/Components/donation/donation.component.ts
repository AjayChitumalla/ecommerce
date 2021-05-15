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
  constructor(public data:DataService,public flashMessage:FlashMessagesService) { }

  ngOnInit() {
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
    this.flashMessage.show("Product added Successfully!",{cssClass:'alert-success',timeout:3000});
  }
  showerr(e){
    this.flashMessage.show(e.msg,{cssClass:'alert-danger',timeout:3000});
  }
  sub(){
    this.data.donate(this.name,this.desc,this.cat,this.quantity,this.image.name).subscribe(d=>{
      this.showflash();
      var product = {
        Name:this.name,
        Description:this.desc,
        Category:this.cat,
        Quantity:this.quantity,
        Image:this.image.name,
        Time:new Date().toLocaleString()
      }
      this.name="";
      this.quantity=0;
      this.desc="";
      this.image='';
      this.cat="";
      var user = localStorage.getItem('uid');
      this.data.updateDonation(user,product).subscribe(d=>{},
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
    if(this.name!="" && this.quantity && this.desc!="" && this.image && this.cat!="")
    return true;
    return false;
  }
}
