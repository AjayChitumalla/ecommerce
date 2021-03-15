import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  serverUrl="http://wowmom-be.herokuapp.com";
  constructor(private http:HttpClient,private route:Router) { }
  getProducts(){
    return this.http.get(this.serverUrl+'/products');
  }
  addfile(formdata){
    return this.http.post(this.serverUrl+'/products/file',formdata);
  }
  addprod(name,desc,cat,price,img){
    return this.http.post(this.serverUrl+'/products',{name,desc,cat,price,img});
  }
  deleteItems(arr){
    return this.http.post(this.serverUrl+'/products/delete',{arr});
  }
  getproduct(id){
    return this.http.get(this.serverUrl+'/products/'+id);
  }
  getCustomers(){
    return this.http.get(this.serverUrl+'/users');
  }
  editfile(formdata,id){
    return this.http.post(this.serverUrl+'/products/file',formdata);
  }
  editprod(name,desc,cat,price,img,id){
    return this.http.put(this.serverUrl+'/products/'+id,{name,desc,cat,price,img});
  }
  signup(firstname,lastname,username,password){
    return this.http.post(this.serverUrl+'/users/signup',{firstname,lastname,username,password});
  }
  login(username,password){
    return this.http.post(this.serverUrl+'/users/login',{username,password},{observe:'response'});
  }
  reset(username){
    return this.http.post(this.serverUrl+'/users/reset',{username});
  }
  newpassword(password,id){
    return this.http.post(this.serverUrl+'/users/newpassword',{password,id});
  }
  test(){
    var payload = localStorage.getItem('uid');
    return this.http.post(this.serverUrl+'/test',{payload});
  }
  loggedIn(){
    return !!localStorage.getItem('uid');
  }
  getToken(){
    return localStorage.getItem('uid');
  }
  logout(){
    localStorage.removeItem('uid');
    this.route.navigate(['/']);
  }
  getuser(uid){
    return this.http.get(this.serverUrl+'/users/'+uid);
  }
  updateuser(uid,add,items){
    return this.http.post(this.serverUrl+'/users/order',{uid,add,items});
  }
}
