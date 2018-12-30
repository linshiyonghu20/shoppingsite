import { Component, OnInit } from '@angular/core';
import { NgModel,FormsModule } from '@angular/forms';

import { CartService } from '../cart.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account: string;
  password:string;
  users: User[];
  success_user: User;

  constructor(private cartService: CartService) { }

  login(){
    this.cartService.getUsers()
      .subscribe( users => {
        var account_doc = <HTMLInputElement>document.getElementById("account");
        var password_doc = <HTMLInputElement>document.getElementById("password");
        this.users = users;
        //console.log(this.items);
        for(var i=0; i<users.length;i++){
          if(users[i].account == this.account 
              && users[i].password == this.password){
                this.success_user = users[i];
                account_doc.value = "";
                password_doc.value = "";
                //console.log(this.success_item._id);
                location.replace(this.success_user._id);
              } else {
                alert("Invaild account or password");
                account_doc.value = "";
                password_doc.value = "";
              }
        }
      })
  }

  ngOnInit() {
  }

}

