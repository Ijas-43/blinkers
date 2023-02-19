import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  showMe:boolean=false;
  public products: any;
  public totalItem : number = 0;
  public searchTerm : string ='';
  constructor(private api: ProductService, private cartservice: CartService) { }
  ngOnInit(): void {

    this.cartservice.getproducts()
    .subscribe(res=>{
      this.products = res;
      this.totalItem = res.length;
    })
  }
  toggleTag(){
    this.showMe=!this.showMe
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartservice.search.next(this.searchTerm)

  }
  removeItem(item:any){
    this.cartservice.removeCart(item);
  }

}
