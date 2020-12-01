import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreditCardService {



  private currentLimit = new BehaviorSubject<number>(0);
  newLimit = this.currentLimit.asObservable();


  constructor() { }


  getNewLimit(limit:number){
    this.currentLimit.next(limit);
  }


}
