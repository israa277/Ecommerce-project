import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

const routes: Routes = [
  {path:'' , canActivate:[authGuard]  ,  component:BlankLayoutComponent , children:[
    {path:'' , redirectTo:'home' , pathMatch:'full' ,title:'home'},
    {path:'home' , component:HomeComponent , title:'home'},
    {path:'wishlist' , component:WishListComponent , title:'wishlist'},
    {path:'cart' , component:CartComponent, title:'cart'},
    {path:'checkout/:id' , component:CheckoutComponent, title:'checkout'},
    {path:'allorders' , component:AllordersComponent, title:'allorders'},
    {path:'products' , component:ProductsComponent, title:'products'},
    {path:'details/:id',component:DetailsComponent,title:'details'},
    {path:'categories' , component:CategoriesComponent, title:'categories'},
    {path:'brands' , component:BrandsComponent, title:'brands'},
  ] },
  {path:'' , component:AuthLayoutComponent , children:[
    {path:'login' , component:LoginComponent, title:'login'},
    {path:'forgetpassword' , component:ForgetpasswordComponent, title:'forgetpassword'},
    {path:'register' , component:RegisterComponent, title:'register'}
  ] },
  {path:'**' , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
