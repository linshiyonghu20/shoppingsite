import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { CartService } from './cart.service';
import { User } from './user';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    CreateComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
