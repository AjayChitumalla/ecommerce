import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { DataService } from '../app/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private data:DataService,private route:Router) { }
  canActivate() : boolean{
    if(this.data.loggedIn()){
      return true;
    }
    else{
      this.route.navigate(['/login']);
      return false;
    }
  }
}
