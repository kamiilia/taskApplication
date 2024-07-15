import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class RootingService {

  constructor(private router: Router) { }
  navigateTo(url: string, id? : number) {
    if(id){
      this.router.navigate([url +id]);
    }else{
      this.router.navigate([url]);
    }
  }
}
