import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interface/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[] , text:string): Product[] {
    return products.filter((Product)=>Product.title.toLowerCase().includes(text.toLowerCase()));
  }

}
