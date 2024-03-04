import { HttpClient } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  headers:any = {token:localStorage.getItem('eToken')}
  cartNamber:BehaviorSubject <number> = new BehaviorSubject(0)

  addToCart(productId:String|undefined):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{
      "productId": productId
    },
    {
      headers: this.headers
    }
    )
  }
  getUserCart():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:this.headers
    })

  }
  removeItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
      headers:this.headers
    })

  }
  updateItem(productId:string , newcount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`  ,
    {
      count: newcount
  }
     , {
      headers:this.headers
    })

  }
  checkout(cartId:string , userData:object):Observable <any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://israa277.github.io/Ecommerce-project` ,
      {
        shippingAddress: userData
    },
    {
      headers:this.headers
    }
  )
  }
  clearAll():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers:this.headers
    })

  }
}
