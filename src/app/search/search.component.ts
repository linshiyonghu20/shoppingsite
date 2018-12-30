import { Component, OnInit } from '@angular/core';

import { CartService} from '../cart.service';
import { User } from '../user';
//import { ProductService} from '../product.service';
import { Product } from '../product';
import { PRODUCTS} from '../products';
import { summaryFileName } from '@angular/compiler/src/aot/util';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],

})
export class SearchComponent implements OnInit {
  user: User;
  search_value: string;
  products = PRODUCTS;
  check_box: boolean;
  total:number;

  constructor(
    private cartService: CartService,
    //private productService: ProductService
  ) { }

  ngOnInit() {
    const id =  location.pathname.split("/")[1];
    const check = location.pathname.split("/")[2];
    if (check == null || check ==''){
      document.getElementById("buyPart").style.display="none";
    }
    this.cartService.getUser(id)
      .subscribe(user => {
        this.user = user;
        var title_doc = document.getElementById("title");
        var title_content = document.createTextNode("Welcom "+ user.account);
        title_doc.appendChild(title_content);

        this.total = 0;
        if(user.cart.length != 0){
          for(var i=0;i<user.cart.length;i++){
            this.total += user.cart[i].price;
          }
        }
      });
  }


  search(){ 
    if(this.search_value != ''|| this.search_value != null){
      this.products=[];
      console.log(this.search_value);
      for(var i=0;i<PRODUCTS.length;i++){
        if(PRODUCTS[i].name.indexOf(this.search_value)!=-1){
          this.products.push(PRODUCTS[i]);
        }
      }
    } else {
      this.products = PRODUCTS;
    }
    // if(this.products.length !=0){
    //   this.products.sort(function(a,b){
    //     if(a.name<b.name){
    //       return -1;
    //     } else {
    //       return 1;
    //     }
    //   })
    // }
  }

  sortByName(){
    if (this.products.length !=0 ){
      this.products.sort(function(a,b){
        if(a.name<b.name){
          return -1;
        } else {
          return 1;
        }
      })
    }
  }

  sortByRating(){
    if (this.products.length !=0 ){
      this.products.sort(function(a,b){
        return b.rating-a.rating;
      })
    }
  }

  sortByPrice(){
    if (this.products.length !=0 ){
      this.products.sort(function(a,b){
        return a.price-b.price;
      })
    }
  }

  addItem(product:Product){
    const id =  location.pathname.split("/")[1];
    
    this.cartService.getUser(id)
      .subscribe(user =>{
        var newUser = {
          _id: user._id,
          account: user.account,
          password: user.password,
          cart: user.cart
        }
        var newCart = {
          name: product.name,
          price: product.price
        }
        newUser.cart.push(newCart);

        this.cartService.changeItem(id, newUser)
        .subscribe(user => {
          //console.log(user);
          location.assign(id+"/view");
        });
      })

    
  }





  create(){
    const id =  location.pathname.split("/")[1];

    this.cartService.getUser(id)
      .subscribe(user =>{
        var newUser = {
          _id: user._id,
          account: user.account,
          password: user.password,
          cart:[]
        }

        for(var i=0;i<this.products.length;i++){
          var check_doc = <HTMLInputElement>document.getElementById("product_check_"+i);
          var name_doc = <HTMLInputElement>document.getElementById("product_name_"+i);
          var price_doc = <HTMLInputElement>document.getElementById("product_price_"+i);
          if(check_doc.checked){
            var selected_item={
              name: name_doc.value,
              price: parseInt(price_doc.value,10)
            }
            newUser.cart.push(selected_item);
          }
        }

        this.cartService.changeItem(id, newUser)
          .subscribe(user => {
            //console.log(user);
            location.assign(id+"/create");
          });

      })
     //console.log(id);
     
  }

  view(){
    const id =  location.pathname.split("/")[1];
    this.cartService.getUser(id)
      .subscribe(user =>{
        if(user.cart.length !=0){
          location.assign(id+'/view');
        } else {
          alert("No item in cart! Please create cart with items");
        }
      })
  };

  edit(){
    const id =  location.pathname.split("/")[1];
    this.cartService.getUser(id)
    .subscribe(user =>{
      if(user.cart.length !=0){
        location.assign(id+'/edit');
      } else {
        alert("No item in cart! Please create cart with items");
      }
    })
  };

  buy(){
    const id = location.pathname.split("/")[1];
    alert("You should pay me: $"+this.total);
    this.cartService.getUser(id)
      .subscribe( user => {
        var newUser = {
          _id: user._id,
          account: user.account,
          password: user.password,
          cart:[]
        }

        this.cartService.changeItem(id, newUser)
        .subscribe(user => {
          //console.log(user);
          location.assign(id);
        });
      })
  }


  back(){
    const id =  location.pathname.split("/")[1];
    location.assign(id);
  }

  logout(){
    const id =  location.pathname.split("/")[1];
    location.assign("login");
  }
}
