import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { ShowCart } from '../show_cart';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  
  showCart: ShowCart[];

  constructor( private cartService: CartService) { }

  ngOnInit() {
    const id = location.pathname.split("/")[1];
    this.cartService.getUser(id)
      .subscribe(user => {
          //console.log(user.cart);
          this.showCart=[];
          var init_showCart = {
            name: user.cart[0].name,
            price: user.cart[0].price,
            quantity: 1
          }
          this.showCart.push(init_showCart);

          for(var i=1;i<user.cart.length;i++){
            var mark = true;
            var new_showCart = {
              name: user.cart[i].name,
              price: user.cart[i].price,
              quantity: 1
            };

            for(var j=0;j<this.showCart.length;j++){
              if(new_showCart.name == this.showCart[j].name){
                this.showCart[j].quantity += 1;
                this.showCart[j].price += this.showCart[j].price;
                mark = false;
                break;
              } 
            };
            //console.log(mark);
            if(mark) {this.showCart.push(new_showCart)};
          }
          this.showCart.sort(function(a, b){
            if(a.name<b.name){
              return -1;
            } else {
              return 1;
            }
          })
          //console.log(this.showCart);
      })
  }

}
