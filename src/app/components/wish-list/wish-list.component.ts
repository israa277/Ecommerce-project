import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interface/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  constructor(private _WhishlistService:WhishlistService,private _CartService:CartService,private toastr: ToastrService){}
  prouduct:Product[] = []
  whishListData:Product[] = []
  ngOnInit(): void {
    this._WhishlistService.getToWishList().subscribe({
      next:(res)=>{
        this.prouduct = res.data
      }
    })
  }
  addCart(id:String):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this.toastr.success(response.message)
        this._CartService.cartNamber.next(response.numOfCartItems)

      }
    })
  }
 removeWishlist(id:string | undefined):void{
  this._WhishlistService.removeItem(id).subscribe({
    next:(res)=>{
      // this._WhishlistService.getToWishList().subscribe({
      //   next:(respon)=>{
      //     this.whishListData = respon.data
      //   }
      // })
      this.whishListData = res.data
      const newData = this.prouduct.filter((item:any)=>this.whishListData.includes(item._id))
      this.prouduct = newData
    }

  })
 }

}
