import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  products;
  url=[];
  url1;
  ord;
  constructor(public data : DataService,private domsanitizer : DomSanitizer,private route:Router) { }
  ngOnInit() {
    this.data.getProducts().subscribe(d=>{
      this.products=d;
      for(var i=0;i<this.products.length;i++){
        this.url1=this.domsanitizer.bypassSecurityTrustUrl(this.data.serverUrl+'/images/'+this.products[i].Image);
        this.url.push(this.url1);
      }
    })
    localStorage.setItem('page','home');
    if(localStorage.getItem('orders'))
    { var x;}
    else
    localStorage.setItem('orders','0');
  }
  add(ind){
    var item = this.products[ind];
    var i=0;
    var cart=[];
    if(localStorage.getItem('cart')){
      cart=JSON.parse(localStorage.getItem('cart'));
      for(var x=0;x<cart.length;x++){
        if(cart[x].Name==item.Name){
          i=1;
          break;
        }
      }
      if(i===0){
        var x:number;
        item.quantity=1; 
        item.Time=new Date().toLocaleString(); 
        cart.push(item);
        localStorage.setItem('cart',JSON.stringify(cart));
        if(localStorage.getItem('sum'))
          x=parseInt(localStorage.getItem('sum'))+item['Price'];
        else
          x=item['Price'];
        localStorage.setItem('sum',JSON.stringify(x));
      }
    }
    else{
      var x:number;
      item.quantity=1;
      item.Time=new Date().toLocaleString();
      cart.push(item);
      localStorage.setItem('cart',JSON.stringify(cart));
      if(localStorage.getItem('sum'))
        x=parseInt(localStorage.getItem('sum'))+item['Price'];
      else
        x=item['Price'];
      localStorage.setItem('sum',JSON.stringify(x));
    }
  }
  check(){
    if(localStorage.getItem('uid')){
      this.route.navigate(['/donate']);
    }
    else{
      this.route.navigate(['/login']);
    }
  }
}
