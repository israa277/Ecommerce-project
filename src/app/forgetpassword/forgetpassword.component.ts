import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotpassService } from '../shared/services/forgotpass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  constructor(private _ForgotpassService:ForgotpassService , private _Router:Router){}
  step1:boolean = true
  step2:boolean = false
  step3:boolean = false
  email:string =''
  msg:string = ''
  forgetForm:FormGroup = new FormGroup({
    email:new FormControl('')
  })
  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })
  resetPassForm:FormGroup = new FormGroup({
    newPassword:new FormControl('' , [ Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  })
  forgetPass():void{
    let userEmail = this.forgetForm.value
    this.email = userEmail.email
    this._ForgotpassService.forgotPassword(userEmail).subscribe({
      next:(response)=>{
        this.msg = response.message
        this.step1 = false
        this.step2 = true

      },error:(err)=>{
        this.msg = err.error.message;

      }
    })
  }
  resetCode():void{
    let resetCode = this.resetCodeForm.value
    this._ForgotpassService.resetCode(resetCode).subscribe({
      next:(res)=>{
        this.msg = res.status
        this.step2 = false
        this.step3 = true

      },error:(err)=>{
        this.msg = err.error.message;

      }
    })
  }
  resetPss():void{
    let resetPass = this.resetPassForm.value
    resetPass.email = this.email
    this._ForgotpassService.resetPass(resetPass).subscribe({
      next:(res)=>{
        if (res.token) {
          localStorage.setItem('eToken' , res.token)
          this._Router.navigate(['/home'])

        }

      },error:(err)=>{
        this.msg = err.error.message;

      }
    })
  }
}
