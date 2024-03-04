import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  mgError:string = ''
  isloading:boolean = false
  constructor(private _AuthService:AuthService , private _Router:Router, private _FormBuilder:FormBuilder){

  }
  registerForm: FormGroup = this._FormBuilder.group({
    name: ['' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)] ],
    email: ['' , [Validators.required , Validators.email]],
    password: ['' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)] ],
    rePassword: [''],
    phone: [ '' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  } , {validators:[this.confirmPass]} as FormControlOptions )
  confirmPass(group:FormGroup):void{
    const password = group.get('password')
    const repass = group.get('rePassword')
    if (repass?.value == '') {
      repass?.setErrors({req:true})

    }if (password?.value != repass?.value) {
      repass?.setErrors({err:true})

    }

  }
// registerForm: FormGroup = new FormGroup({
//   name: new FormControl (null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)] ),
//   email: new FormControl(null , [Validators.required , Validators.email]),
//   password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)] ),
//   rePassword: new FormControl(null, [Validators.required , Validators.pattern(/^\w{6,}$/)]),
//   phone: new FormControl( null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
// })
handelForm ():void{
  if(this.registerForm.valid){
    this.isloading = true
    this._AuthService.setRegister(this.registerForm.value).subscribe({
      next:(response)=>{
        if(response.message == 'success'){
          this.isloading =false
          this._Router.navigate(['/login'])
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.isloading =false
        this.mgError =err.error.message

      }
    })
  }else{
    this.registerForm.markAllAsTouched()
  }

}
}
