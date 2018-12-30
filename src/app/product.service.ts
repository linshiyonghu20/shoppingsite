import { Injectable } from '@angular/core';

import { Product } from './product';
import { PRODUCTS } from './products';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(){
    return PRODUCTS;
  }
}
