import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interface/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private _EcomdataService:EcomdataService,private _CartService:CartService,private toastr: ToastrService,private _WhishlistService:WhishlistService){}

  searchTerm:string = ''
  products:Product[] =[]
  wishList:string[]=[]
  categeries:any[] =[]
  addCart(id:String):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this.toastr.success(response.message)
        this._CartService.cartNamber.next(response.numOfCartItems)

      }
    })
  }
  ngOnInit(): void {
      this._EcomdataService.getAllProduct().subscribe({
       next:(response)=>{
        this.products = response.data
       }
      })
      this._EcomdataService.getCategories().subscribe({
        next:(response)=>{
          this.categeries = response.data
        }
      })
      this._WhishlistService.getToWishList().subscribe({
        next:(resp)=>{
          const newData = resp.data.map((item:any)=>item._id)
          this.wishList = newData
        }
      })
  }
  wishlist(Id:string | undefined):void{
    this._WhishlistService.addToWishList(Id).subscribe({
      next:(respone)=>{
        this.toastr.success(respone.message)
        this.wishList = respone.data


      }
    })

  }
  removeWishlist(id:string | undefined):void{
    this._WhishlistService.removeItem(id).subscribe({
      next:(res)=>{
        this.wishList = res.data

      }
    })
   }
}
