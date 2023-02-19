import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  public products: any;
  public filterCategory : any;
public showMyMessage = false;
searchKey:string ="";

  constructor(private api: ProductService, private cartservice: CartService) { }

  ngOnInit(): void {

    this.api.getProductList().subscribe(res => {
      this.products = res;
      this.filterCategory = res;

      this.products.forEach((a: any) => {
        Object.assign(a,{ quantity: 1, total: a.price });
      });
      console.log(this.products);
    });
    this.cartservice.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addtoCart(item: any) {
    this.cartservice.addtoCart(item);
    setTimeout(() => {
      this.showMyMessage = true
    },3000)

  }
filter(category:string){
  this.filterCategory = this.products
  .filter((a:any)=>{
    if(a.category == category || category==''){
      return a;
    }
  })
}
}
