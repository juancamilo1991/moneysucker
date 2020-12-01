import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../../services/credit-card.service';
import { Product } from '../../models/product';
import { RulesService } from '../../services/rules.service';
import { Balance } from 'src/app/models/balance';


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
  


  constructor(private ruleService: RulesService, private creditCardService: CreditCardService) { }

  ngOnInit() {
    this.ruleService.newProduct.subscribe(groceryList => { this.groceryList = groceryList });
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
    this.ruleService.getNextProduct(this.groceryList);
  }

  getAllProducts():Product[]{
    return this.groceryList;
  }





 


  


 


}
