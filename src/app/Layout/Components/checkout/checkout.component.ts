import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TabHeadingDirective } from 'ng-bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
  cartItems=[];
  sum;
  address={
    firstname:'',
        lastname:'',
        street:'',
        city:'',
        state:'',
        pin:0,
        phone:0
  };
  user;
  constructor(public data:DataService,public flashMessage:FlashMessagesService,private route: Router) { }

  ngOnInit() {
    this.cartItems=JSON.parse(localStorage.getItem('cart'));
    this.sum=localStorage.getItem('sum');
    this.user=JSON.parse(localStorage.getItem('user'));
    if(this.user['Address'])
        this.address=this.user['Address'];
  }
  valid(){
    if(this.address['firstname']!='' && this.address['lastname']!='' && this.address['city']!='' && this.address['phone']!=0 && this.address['pin']!=0 && this.address['state']!='' && this.address['street']!='')
      return true;
    return false;
  }
  update(){
    var user=localStorage.getItem('uid');
    var Time = new Date().toLocaleString();
    for(var i=0;i<this.cartItems.length;i++){
      if(this.cartItems[i]['Quantity']<=this.cartItems[i]['quantity']){
        this.data.deleteItem(this.cartItems[i]['_id']).subscribe(d=>{});
      }
      else{
        var quant=
        this.data.updateQuantity(this.cartItems[i]['_id'],this.cartItems[i]['Quantity']-this.cartItems[i]['quantity']).subscribe(d=>{});
      }
      this.data.donate(this.cartItems[i]['Name'],this.cartItems[i]['Description'],this.cartItems[i]['Category'],
      this.cartItems[i]['quantity'],this.cartItems[i]['Image'],Time,this.user,"Request Received").subscribe(d=>{
        this.data.updateDonation(user,d,this.address).subscribe(d=>{
          console.log(d);      
        })
      })
    }
    setTimeout(()=>this.route.navigate(['/myorders']),3000);
    localStorage.removeItem('cart');
  }
}
