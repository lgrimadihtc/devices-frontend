import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ProductPipe', pure: false })
export class ProductPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(product => {
        if (product.title) {
          return product.title.search(searchText) !== -1;
        }
        else{
          return product.title.search(searchText) !== -1;
        }
      });
    }
  }
}