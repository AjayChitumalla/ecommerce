import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.sass']
})
export class NewproductComponent implements OnInit {
  image;
  name="";
  price;
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
  sub(){
    this.data.addprod(this.name,this.desc,this.cat,this.price,this.image.name).subscribe(d=>{
      this.showflash();
    })
  }
  valid(){
    if(this.name!="" && this.price && this.desc!="" && this.image && this.cat!="")
    return true;
    return false;
  }
}
