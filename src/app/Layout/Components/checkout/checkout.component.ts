import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
  constructor(public data:DataService,public flashMessage:FlashMessagesService,private route: Router) { }

  ngOnInit() {
    this.cartItems=JSON.parse(localStorage.getItem('cart'));
    this.sum=localStorage.getItem('sum');
    this.data.getuser(localStorage.getItem('uid')).subscribe(d=>{
      localStorage.setItem('user',JSON.stringify(d));
      if(d['Address'])
        this.address=d['Address'];
    })
  }
  valid(){
    if(this.address['firstname']!='' && this.address['lastname']!='' && this.address['city']!='' && this.address['phone']!=0 && this.address['pin']!=0 && this.address['state']!='' && this.address['street']!='')
      return true;
    return false;
  }
  update(){
    var user=localStorage.getItem('uid');
    this.data.updateuser(user,this.address,this.cartItems).subscribe(d=>{
      setTimeout(()=>this.route.navigate(['/myorders']),3000);
      var x=parseInt(localStorage.getItem('orders'));
      x=x+1;
      localStorage.setItem('orders',String(x));
      localStorage.removeItem('cart');
      localStorage.removeItem('sum');
      this.data.getuser(localStorage.getItem('uid')).subscribe(d=>{
        localStorage.setItem('user',JSON.stringify(d));
      })
    })
  }
}
