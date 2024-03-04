import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  msgError:string='';
  isloading:boolean=false
  constructor(private _AuthService:AuthService , private _Router:Router,private _FormBuilder:FormBuilder){}

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null , [Validators.required , Validators.email]],
    password: [null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)] ],
  })
// loginForm:FormGroup = new FormGroup({
//   email:new FormControl('' , [Validators.required  , Validators.email]),
//   password:new FormControl('' , [Validators.required , Validators.pattern(/^\w{6,}$/)])
// })
handelForm(){
  if(this.loginForm.valid){
    this.isloading = true
    this._AuthService.setLogin(this.loginForm.value).subscribe({
      next:(respone)=>{

        this.isloading = false
        localStorage.setItem('eToken' , respone.token);
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])

      },
      error:(err:HttpErrorResponse)=>{
        this.isloading = false
        this.msgError = err.error.message
      }
    })
  }
  else{
    this.loginForm.markAllAsTouched()
  }


}
}
