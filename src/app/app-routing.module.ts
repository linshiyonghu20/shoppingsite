import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { CreateComponent} from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { componentFactoryName } from '@angular/compiler';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: ':id', component: SearchComponent, children:[
    { path: 'create', component: CreateComponent },
    { path: 'view', component: ViewComponent},
    { path: 'edit', component: EditComponent},
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
