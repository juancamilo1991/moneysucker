import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../../services/product-data.service';
import { Product } from '../../models/product';



@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private prodDataService: ProductDataService) { }


  groceryList: Product[];

  ngOnInit() {
    this.prodDataService.currentProduct.subscribe(groceryList => { this.groceryList = groceryList });
  }


  


}
