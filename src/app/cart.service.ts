import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class CartService {

  constructor(private http: Http) { }

  getUsers(){
    return this.http.get('http://localhost:3000/stickies')
      .map(res => res.json());
  }

  getUser(id){
    return this.http.get('http://localhost:3000/stickies/'+ id)
      .map(res => res.json());
  }

  changeItem(id, newItem){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/stickies/'+id, newItem, {headers: headers})
      .map(res => res.json());
  }
}
