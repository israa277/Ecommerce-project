import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent  implements OnInit{
constructor(private _AuthService:AuthService , private _CartService:CartService ){
}
cartNumber:number = 0
ngOnInit(): void {
  this._CartService.cartNamber.subscribe({
    next:(data)=>{
      this.cartNumber = data

    }
  })

  this._CartService.getUserCart().subscribe({
    next:(res)=>{
      this.cartNumber = res.numOfCartItems
    }
  })

}
logOutUser():void{
   this._AuthService.logOut()
}
}
