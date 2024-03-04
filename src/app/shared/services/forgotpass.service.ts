import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  constructor(private _HttpClient:HttpClient) { }
  forgotPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` ,
      userEmail
    )
  }
  resetCode(resetForm:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` ,
    resetForm
    )}
    resetPass(resetPass:object):Observable<any>{
      return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` ,
      resetPass
      )}
}
