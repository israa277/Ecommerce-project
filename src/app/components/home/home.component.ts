import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interface/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _WhishlistService:WhishlistService ,private _EcomdataService:EcomdataService,private _CartService:CartService,private toastr: ToastrService){}
  categorySliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    dots: false,
    autoplayTimeout: 3000 ,
    autoplaySpeed: 1000 ,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  mainSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    dots: false,
    autoplayTimeout: 3000 ,
    autoplaySpeed: 1000 ,
    navSpeed: 700,
    navText: ['', ''],
  items:1,
    nav: true
  }
  searchTerm:string = ''
  products:Product[] =[]
  categeries:any[] =[]
  wishList:string[]=[]
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
