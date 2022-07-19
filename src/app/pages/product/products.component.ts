import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Product } from './products.model';
import { ProductService } from '../../services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ProductService, StorageService]
})
export class ProductsComponent implements OnInit {

  public menuItems: Array<any>;

  public product: Product = new Product();
  public products: Product[];
  public selectedProducts: Product[] = [];
  public searchText: string;
  public p: any;
  public form: any;

  public type: string = 'grid';

  edit: boolean;

  constructor(
    private toastrService: ToastrService,
    private productService: ProductService,
    private modalService: NgbModal,
    private route: Router,
    private storageService: StorageService) {


  }

  ngOnInit() {
    this.getProducts();



  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products
      this.products.forEach(element => {
        element.checked = false;
        element.quantity = 1;
      })
    }
    );
  }


  public toggle(type) {
    this.type = type;
  }








  public submit(): void {
    if (this.selectedProducts.length == 0) {
      this.toastrService.warning("You don't have select any product")

    }
    else {
      this.storageService.store(this.selectedProducts);
      this.route.navigate(['/payment']);
    }

  }
  public change(i) {


    var item = this.products.filter(item => item.id == i)[0];
    item.checked = !item.checked
    this.selectedProducts = this.products.filter(item => item.checked)
  }



}
