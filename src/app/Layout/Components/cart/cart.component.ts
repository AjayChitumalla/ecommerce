import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems=[];
  url=[];
  url1;
  sum;
  constructor(public data:DataService,private domsanitizer:DomSanitizer,private route: Router) { }

  ngOnInit() {
    this.sum=localStorage.getItem('sum');
    this.cartItems=JSON.parse(localStorage.getItem('cart'));
    for(var i=0;i<this.cartItems.length;i++){
      this.url1=this.domsanitizer.bypassSecurityTrustUrl(this.data.serverUrl+'/images/'+this.cartItems[i].Image);
      this.url.push(this.url1);
    }
  }
  findtotal(){
    var sum=0;
    for(var i=0;i<this.cartItems.length;i++)
      sum=sum+parseInt(document.getElementById("value"+i).textContent.substring(3,));
    document.getElementById("tot").textContent='Rs.'+sum;
    this.sum=sum;
    localStorage.setItem('sum',this.sum);
  }
  remove(ind){
    var x=localStorage.getItem('sum');
    var y=parseInt(x)-this.cartItems[ind]['Price'];
    localStorage.setItem('sum',JSON.stringify(y));
    this.cartItems.splice(ind,1);
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
    this.findtotal();
  }
  add(i){
    var j=i.toString();
    var s=parseInt((<HTMLInputElement>document.getElementById("count"+j)).value);
    s++;
    (<HTMLInputElement>document.getElementById("count"+j)).value=s.toString();
    var val = s*this.cartItems[i]['Price'];
    this.cartItems[i]['quantity']=s;
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
    //document.getElementById("value"+j).textContent='Rs.'+val;
    this.findtotal();
  }
  dec(i){
    var j=i.toString();
    var s=parseInt((<HTMLInputElement>document.getElementById("count"+j)).value);
    if(s>1)
    s--;
    (<HTMLInputElement>document.getElementById("count"+j)).value=s.toString();
    var val = s*this.cartItems[i]['Price'];
    this.cartItems[i]['quantity']=s;
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
    //document.getElementById("value"+j).textContent='Rs.'+val;
    this.findtotal();
  }
  changed(ind){
    var s=parseInt((<HTMLInputElement>document.getElementById("count"+ind)).value);
    var val = s*this.cartItems[ind]['Price'];
    this.cartItems[ind]['quantity']=s;
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
    document.getElementById("value"+ind).textContent='Rs.'+val;
    this.findtotal();
  }
  check(){
    if(localStorage.getItem('uid')){
      localStorage.setItem('sum',this.sum);
      this.route.navigate(['/checkout']);
    }
    else{
      this.route.navigate(['/login']);
    }
  }
}
