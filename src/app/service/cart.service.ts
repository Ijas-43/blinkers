import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartList: any = []
  public products = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getproducts() {
    return this.products.asObservable();
  }

  setProducts(product: any) {
    this.cartList.push(...product);
    this.products.next(product);
  }

  addtoCart(product: any) {
    this.cartList.push(product);
    this.products.next(this.cartList);
    this.getTotalPrice();
    console.log(this.cartList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }


  removeCart(product: any) {
    this.cartList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartList.splice(index, 1);
      }
    });
    this.products.next(this.cartList);
  }

  removeAllCart() {
    this.cartList = [];
    this.products.next(this.cartList);
  }
}
