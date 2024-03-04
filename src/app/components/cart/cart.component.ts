import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService ){}
  cartDetails:any = null
  changeCount(id:string , count:number):void{
    if(count > 0){
      this._CartService.updateItem(id , count).subscribe({
        next:(response)=>{
          this.cartDetails= response.data
        }
      })
    }
  }
  removeCartItem(id:string):void{
    this._CartService.removeItem(id).subscribe({
      next:(response)=>{
        this.cartDetails = response.data
        this.numOfCartItems = response.numOfCartItems
        this._CartService.cartNamber.next(response.numOfCartItems)
      }
    })

  }
  numOfCartItems!:number
  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
          this.numOfCartItems = response.numOfCartItems
          this.cartDetails = response.data

        }
      })
  }
  clear():void{
    this._CartService.clearAll().subscribe({
      next:(resp)=>{
        if(resp.message === 'success'){
          this.cartDetails = null
          this._CartService.cartNamber.next(0)
        }

      }
    })
  }
}
