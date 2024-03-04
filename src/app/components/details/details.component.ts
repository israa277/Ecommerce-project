import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import {  Product } from 'src/app/shared/interface/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _EcomdataService:EcomdataService ,private _CartService:CartService,private toastr: ToastrService ){}
  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
  productDetails:Product = {} as Product
  ngOnInit(){
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idPro:any = params.get('id');
        this._EcomdataService.getProductDetails(idPro).subscribe({
          next:(response)=>{
            this.productDetails = response.data

          }
        })
      }

    })

  }
  addCart(id:String|undefined):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this.toastr.success(response.message)
        this._CartService.cartNamber.next(response.numOfCartItems)

      }
    })
  }
}
