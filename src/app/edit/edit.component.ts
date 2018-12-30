import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { ShowCart } from '../show_cart';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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


  removeOne(productName: string){
    const id = location.pathname.split("/")[1];
    //console.log(productName);
    this.cartService.getUser(id)
      .subscribe(user => {
        var newUser = {
          _id: user._id,
          account: user.account,
          password: user.password,
          cart: user.cart,
        }

        for(var i=0;i<newUser.cart.length;i++){
          if(newUser.cart[i].name == productName){
            newUser.cart.splice(i,1);
            break;
          }
        }

        this.cartService.changeItem(id, newUser)
        .subscribe(user => {
          //console.log(user);
          location.reload();
        });
      })
      
  }

  removeAll(productName: string){
    const id = location.pathname.split("/")[1];
    //console.log(productName);
    this.cartService.getUser(id)
      .subscribe(user => {
        var newUser = {
          _id: user._id,
          account: user.account,
          password: user.password,
          cart: user.cart,
        }
        var newCart=[];
        for(var i=0;i<newUser.cart.length;i++){
          if(newUser.cart[i].name != productName){
            newCart.push(newUser.cart[i]);
          }
        }

        newUser.cart = newCart;
        this.cartService.changeItem(id, newUser)
        .subscribe(user => {
          console.log(user);
          location.reload();
        });
      })
      
  }

}
