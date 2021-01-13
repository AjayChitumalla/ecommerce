import { Injectable, Injector } from '@angular/core';
import { HttpClient,HttpInterceptor } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req,next){
    let dataService = this.injector.get(DataService);
    let tokenReq=req.clone({
      setHeaders:{
        Authorization: `Bearer ${dataService.getToken()}`
      }
    })
    return next.handle(tokenReq);
  }
}
