import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductDataService } from './product-data.service';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {



  data: Product[];
  credCardLimit: number;
  lowest = 500000000;
  highest = 2000000000;


  constructor(private prodData: ProductDataService) { }


  getCurrentPrice():number{
    //get current data from BehaviurSubject
    this.prodData.newProduct.subscribe((data) => this.data = data);
    //evaluate price here
    return this.getPrice().reduce((currentTotal, object) => currentTotal + object.price, 0)
  }


  getPrice(){
    return this.data;
  }


  //always between 500 Million and 2 Billion Dollars
  getLimit(){
    this.credCardLimit = Math.floor(Math.random()*(this.highest-this.lowest+1)+this.lowest);
  }


   // a total price enters the "too high zone" when it equals or is higher than the given creditcard limit
   priceTooHigh():boolean{
    if(this.getCurrentPrice() >= this.credCardLimit){
      //enter too "high zone"
      return true;
    }
    else { return false }
  }


  priceTooLow():boolean{
    if((this.getCurrentPrice() < (this.credCardLimit/2))){
      return true;
    }
    else { return false }
  }

}
