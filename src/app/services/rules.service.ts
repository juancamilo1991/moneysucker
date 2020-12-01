import { Injectable, Type } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { Balance } from '../models/balance';


@Injectable({
  providedIn: 'root'
})

export class RulesService {


type: string
data: Product[];
product: Product;
hundred:number = 100;
thirdy:number = 30;
currentProduct = new BehaviorSubject<Product[]>(null);
newProduct = this.currentProduct.asObservable();

//behaviorsubject to print out the object which has too many types of
//groceryList component will use it
private currentOverkill = new BehaviorSubject<string>('');
newGameStat = this.currentOverkill.asObservable();

  constructor() { }



getNextProduct(product: Product[]){
  this.currentProduct.next(product);
}

getNextStat(){
  this.currentOverkill.next()
}

getCurrentTotalPrice(totalProducts:Product[]):number{
  //evaluate price here
  return totalProducts.reduce((currentTotal, object) => currentTotal + object.price, 0) 
}


maxTypes(totalProducts:Product[]):number[]{
  return Object.values<number>(this.listOfTypes(totalProducts))
}


isTypeAmountAcceptable(typeAmount: number, totalProducts: Product[]):boolean{
    return (typeAmount*this.hundred)/(totalProducts.length) <= this.thirdy
}


  //returns Object consisting of specific type and corresponding number of occurances as key value pairs
    listOfTypes(totalProducts:Product[]){
    let types = totalProducts.map(object => object.type)  
      .reduce((total, type) => {
        let to:number = total[type]
      total[type] = (to || 0) + 1;
      
      return total;
    }, {})
    return types;
  }


  // //returns a string of the highest occurring type if the ratio is exceeded 

 
  highestTypeOccurances(totalProducts:Product[]):string[]{
    return Object.keys
          (this.listOfTypes(totalProducts)).filter((occurrance) => 
      this.isTypeAmountAcceptable(this.listOfTypes(totalProducts)[occurrance], totalProducts)
   )
  }

    // if(!this.isTypeAmountAcceptable(totalProducts)){  
    //   this.type = Object.keys(this.listOfTypes(totalProducts))
    //   .filter(type => this.listOfTypes(totalProducts)[type] === this.maxType(totalProducts));
    //   } return;
  


 // a total price enters the "too high zone" when it equals or is higher than the given creditcard limit
 //returns object 
  balancedGame(balance: Balance, totalProducts: Product[]):Balance{
   let accumulatorBalance: Balance;
   let totalPrice = this.getCurrentTotalPrice(totalProducts);
   let totalImbalances:Balance = Object.entries(balance).reduce((imbalances, [property, value]) => {
    imbalances[property] = [];
      if(value.spendings){
        let message = this.validateLimit(totalPrice, value.spendings);
        if(message) imbalances[property].push(message);
      }
      if(value.balanced){
      let imbalancedTypes = this.validateTypes(totalProducts); //returns array of alert messages
        if(imbalancedTypes.length) imbalances[property] = imbalancedTypes;
      }
      return imbalances;
    }, accumulatorBalance)

    return totalImbalances;
  }


  validateLimit(totalPrice:number, stateLimit:number):string{
    if(totalPrice > stateLimit){
      return `credid card limit exceeded!`;
    }
    if(totalPrice < stateLimit){
      return `credid card limit heavily undercut!`
    } 

  }


  validateTypes(totalProducts: Product[]):string[]{
   if(this.highestTypeOccurances(totalProducts).length){
    return this.highestTypeOccurances(totalProducts).map(type => `too many ${type}`)
   };
  }



  

}
