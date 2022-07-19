import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Product } from '../product/products.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [ StorageService]

})
export class PaymentComponent implements OnInit {


   
  products:Product[];
  total:number;
  accountForm:FormGroup;
  constructor(private formBuilder: FormBuilder,public storageService:StorageService) {

    this.accountForm = this.formBuilder.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'address': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])]            
  });
  }
  
  ngOnInit(): void {
    this.products=this.storageService.retrieve();
    this.updateTotal();
    
  

  }
  subtract(id,index) {
    var item = this.products.filter(item => item.id == id)[0];
    item.quantity = item.quantity-1
    if ( item.quantity ==0&&index > -1) {
       this.products.splice(index, 1);
    }
    
    this.updateTotal()
  }
  add(id) {
    var item = this.products.filter(item => item.id == id)[0];
    item.quantity = item.quantity+1
    
    this.updateTotal()
  }

      
 updateTotal(){
  this.total = this.products.reduce((accumulator, item) => {
    return accumulator + item.quantity*item.price;
  }, 0);
  
 }

 submit(){}
}
