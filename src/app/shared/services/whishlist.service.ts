import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/'

  constructor(private _HttpClient:HttpClient) { }
  addToWishList(ID:string |undefined):Observable <any>{
     return this._HttpClient.post(this.baseUrl + `wishlist` ,
     {
      productId: ID
  }
     )

  }
  getToWishList():Observable <any>{
    return this._HttpClient.get(this.baseUrl + `wishlist`
    )
  }
  removeItem(productId:string|undefined):Observable<any>{
      return this._HttpClient.delete(this.baseUrl + `wishlist/${productId}` )
    }
  }
