import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.sass']
})
export class EditproductComponent implements OnInit {

  constructor(public data:DataService,private actroute:ActivatedRoute,public flashMessage:FlashMessagesService) { }
  id;
  name;
  desc;
  cat;Quantity;img
  ngOnInit() {
    this.id=this.actroute.snapshot.params.id;
    this.data.getproduct(this.id).subscribe(d=>{
      this.name=d['Name'],
      this.desc=d['Description'],
      this.cat=d['Category'],
      this.Quantity=d['Quantity'],
      this.img=d['Image']
    })
  }
  selectImg(event){
    if(event.target.files.length>0){
      var file = event.target.files[0];
      this.img=file;
      console.log(this.img);
    }
  }
  imgsub(){
    const formdata = new FormData();
    formdata.append('file',this.img);
    this.data.editfile(formdata,this.id).subscribe(d=>{
      console.log(d);
    })
  }
  showflash(){
    this.flashMessage.show("Item updated Successfully!",{cssClass:'alert-success',timeout:3000});
  }
  sub(){
    this.data.editprod(this.name,this.desc,this.cat,this.Quantity,this.img.name,this.id).subscribe(d=>{
      this.showflash();
    })
  }
  valid(){
    if(this.name!="" && this.Quantity && this.desc!="" && this.img && this.cat!="")
    return true;
    return false;
  }
}
