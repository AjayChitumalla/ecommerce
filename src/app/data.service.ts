import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  serverUrl="http://localhost:3000";
  constructor(private http:HttpClient) { }
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
  editfile(formdata,id){
    return this.http.post(this.serverUrl+'/products/file',formdata);
  }
  editprod(name,desc,cat,price,img,id){
    return this.http.put(this.serverUrl+'/products/'+id,{name,desc,cat,price,img});
  }
}
