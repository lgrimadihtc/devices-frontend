import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../pages/product/products.model';
import { environment } from '../../environments/environment';
@Injectable()
export class ProductService {

    public urlService = environment.UrlApi+"product";
    updateProduct(product: Product) {
        return this.http.put(this.urlService+"/"+product.id, product);
    }
  
    
    constructor(public http:HttpClient) { }



    getProducts(): Observable<any> {
        return this.http.get<any>(this.urlService);
    }

    

    addProduct(product:Product){	    
        return this.http.post(this.urlService, product);
    }
} 