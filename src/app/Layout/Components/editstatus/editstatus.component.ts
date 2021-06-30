import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-editstatus',
  templateUrl: './editstatus.component.html',
  styleUrls: ['./editstatus.component.sass']
})
export class EditstatusComponent implements OnInit {
  id;
  item={};
  constructor(public data:DataService,private actroute:ActivatedRoute,public flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.id=this.actroute.snapshot.params.id;
    this.data.getReceivedItem(this.id).subscribe(d=>{
      this.item=d;
      console.log(this.item);
  })
  }
  showflash(){
    this.flashMessage.show("Status updated Successfully!",{cssClass:'alert-success',timeout:3000});
  }
  sub(){
    console.log(this.item['Status']);
    this.data.updateStatus(this.item['Status'],this.id).subscribe(d =>{
      this.showflash();
    })  
  }
}
