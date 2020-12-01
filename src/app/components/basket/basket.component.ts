import { Component, OnInit } from '@angular/core';
import { RulesService } from '../../services/rules.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Product } from '../../models/product';




@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {


  data:Product[];

  constructor(private prodDataService: RulesService, private credCardService: CreditCardService) { }



  ngOnInit() {
    this.prodDataService.newProduct.subscribe((data) => this.data = data)
  }


  basketExploding():boolean{
    if((this.credCardService.limitExceeded(this.data) && !this.prodDataService.isTypeAmountAcceptable(this.data)) ||
    this.credCardService.limitExceeded(this.data))
        { return true }
          else return false
  }


  basketDying():boolean{
    if((this.credCardService.limitExceeded(this.data) && !this.prodDataService.isTypeAmountAcceptable(this.data)) || 
        this.credCardService.totalTooLow(this.data))
        { return true }
          else return false
   }


   basketOk():boolean{
    if(this.credCardService.priceOk(this.data) && this.prodDataService.isTypeAmountAcceptable(this.data))
      { return true }
        else return false 
  }


  checkBasketState(){
    let basket = {
      "basket-ok": this.basketOk(),
      "basket-dying": this.basketDying(),
      "basket-exploding": this.basketExploding()
    }
    return basket;
  }



}
