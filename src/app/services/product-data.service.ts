import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductDataService {


product: Product;
currentProduct = new BehaviorSubject<Product[]>(null);
newProduct = this.currentProduct.asObservable();


  constructor() { }

//get price of objects to see if limit is exceeded



getNextProduct(product: Product[]){
  this.currentProduct.next(product);
}


getTotalPrice(objects:Product[]){

}




}
