import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.sass']
})
export class ReceivedComponent implements OnInit {

  constructor(public data:DataService) { }
  products;
  ngOnInit() {
     this.data.getReceived().subscribe(d=>{
       this.products=d;
     })
  }

}
