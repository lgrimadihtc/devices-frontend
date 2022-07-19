import { Injectable } from "@angular/core";
import { Product } from "../pages/product/products.model";

@Injectable()
export class StorageService {

  public key: string = 'selectedProducts';

  constructor() { }    

  store(products) {
   
  
    localStorage.setItem(this.key,  JSON.stringify(products));
  }

  retrieve() {
    console.dir(JSON.parse(localStorage.getItem(this.key)))
    let products: Product[] = JSON.parse(localStorage.getItem(this.key));

    if (!products) throw 'no products found';
    return products;
  }

}