import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit  {
  constructor(private _EcomdataService:EcomdataService ){}
  order:any = [{}]
  userData:any = ''
  ngOnInit(): void {
    if(localStorage.getItem('eToken')!= null){
      let encodeToken:any = localStorage.getItem('eToken');
      let decodeToken =    jwtDecode(encodeToken);
      this.userData = decodeToken
    }
    this._EcomdataService.getallorders(this.userData.id).subscribe({
            next:(response)=>{

              this.order = response
              console.log(this.order);


            }})
  }


}
