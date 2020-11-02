import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../../services/credit-card.service';
import { Product } from '../../models/product';
import { ProductDataService } from '../../services/product-data.service';
import { totalmem, type } from 'os';

@Component({
  selector: 'app-object-field',
  templateUrl: './object-field.component.html',
  styleUrls: ['./object-field.component.css']
})

// *--------------- component which displays an Object-field ----------------*

// an Object-field is a clickable, rectangular field which displays the price, the type,
// the name well as an image and a short description of the Object
// 

//@createObject - method: create a ProductObject
//@addToGroceryList - method: add a ProductObject to GroceryList Array
//@getAllObjects - method: get Array of all Objects
//@getTotalPrice - method: get total Price of all selected Object-fields

export class ObjectFieldComponent implements OnInit {

  // *---------------------------- add Behaviour Subject here to spread the value when
  //
  // a product is clicked -------------------------------------*

  product: Product;
  groceryList: Product[];
  hundred:number = 100;
  thirdy:number = 30;
  type:string = '';

  constructor(private prodDataService: ProductDataService, private creditCardService: CreditCardService) { }

  ngOnInit() {
    this.prodDataService.currentProduct.subscribe(groceryList => { this.groceryList = groceryList });
  }

  createProduct(){
    return this.product = {
      _id: 1,
      name: 'the beauty',
      description: 'an ancient Vase with an incredible Story!',
      type: 'furniture',
      price: 5000
    }
  }


  addToGroceryList(product){
    this.groceryList.push(product);
  }


  updateGroceryList(){
    this.prodDataService.getNextProduct(this.getAllProducts());
  }

  getAllProducts():Product[]{
    return this.groceryList;
  }


  priceOk(){
    if(!this.creditCardService.priceTooHigh()&&!this.creditCardService.priceTooLow()){
      return true;
    }
    else { return false; }
  }


  //goes into basket-component
checkBasketState(){
  let basket = {
    "basket-ok": this.priceOk() && this.isTypeAmountAcceptable(),
    "basket-dying": this.basketDying(),
    "basket-exploding": this.basketExploding()
  }
  return basket;
}


basketOk():boolean{
  if(this.priceOk() && this.isTypeAmountAcceptable())
    { return true }
      else return false 
}


basketDying():boolean{
 if((this.creditCardService.priceTooLow() && !this.isTypeAmountAcceptable()) || 
     this.creditCardService.priceTooLow())
     { return true }
       else return false
}


mostOccurringType(){
  if(!this.isTypeAmountAcceptable())
  this.type = Object.keys(this.typeList()).find(type => this.typeList()[type] === this.highestOccurance()); return;
  }


basketExploding():boolean{
  if((this.creditCardService.priceTooHigh() && !this.isTypeAmountAcceptable()) ||
      this.creditCardService.priceTooHigh())
      { return true }
        else return false
}


  // evaluates the highest number of occurrences of the specific type of an object in a list of objects

  typeList():any{
    let ans = this.getAllProducts().map(object => object.type)  
      .reduce((total, type) => {
      total[type] = (total[type] || 0) + 1;
      return total;
    }, {})
    return ans;
  }


  highestOccurance():number{
    return Math.max(...Object.values<number>(this.typeList()));
  }


  isTypeAmountAcceptable():boolean{
    let percentage = (this.highestOccurance()*this.hundred)*(this.getAllProducts().length);
    return percentage > this.thirdy ? false : true;
  }


  


 


}
