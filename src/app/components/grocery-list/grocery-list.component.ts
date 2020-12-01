import { Component, OnInit } from '@angular/core';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Product } from '../../models/product';
import { RulesService } from '../../services/rules.service';
import { Balance } from '../../models/balance';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  alertMessages: string[];
  balance: Balance;
  products: Product[] = []
  limit: number;


  constructor(private rulesService: RulesService, private credCardService: CreditCardService, private alertService: AlertService) { }

  
  
  // define interface of what a message array looks like with all cumulated alert messages

  ngOnInit() {
    this.rulesService.newProduct.subscribe(products => this.products = products);
    this.credCardService.newLimit.subscribe(limit => this.limit = limit)
  }

  productListState(products: Product[]){
    const overallBalance = this.balance = {
      credit: {spendings: this.limit},
      overdueType: {balanced: true}
    }

    const alerts = this.rulesService.balancedGame(overallBalance, products);

    return{
      valid: Object.keys(alerts).every(alert => Object.keys(alerts)[alert].length === 0),
      errors: alerts
    }

  }


  updateAlerts(products: Product[]){
    
   let {valid, errors} = this.productListState(products);

    if(valid) return

    else {
     this.alertMessages = this.alertService.printAlerts<Balance>(errors);
    }
  }

}
