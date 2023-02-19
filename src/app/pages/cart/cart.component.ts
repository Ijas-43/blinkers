import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public totalItem ! : number; //public totalItem : number = 0;


  constructor(private cartservice : CartService) { }

  ngOnInit(): void {

    this.cartservice.getproducts().subscribe(res => {
      this.products =res;
      this.totalItem = this.cartservice.getTotalPrice();

    })
    console.log(this.products)
  }

  decrease(item : any){
    if(item.quantity !=1 ) {
      item.quantity -= 1;
    }
  }

  increase(item :any) {
    if(item.quantity !=8 ) {
      item.quantity += 1;
    }
    // console.log(item.quantity);

  }

  removeItem(item:any){
    this.cartservice.removeCart(item);
  }

  emptyCart() {
    this.cartservice.removeAllCart();
  }


}
