import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Brand, Category, Product } from 'src/app/shared/interface/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService){}
  Brands:Brand[] = []
  brandId:string = ''
  SpecificBrand:Brand = {} as Brand
  ngOnInit(): void {
      this._EcomdataService.getBrands().subscribe({
        next:(res)=>{
          this.Brands = res.data

        }
      })
  }

  click(event:any):void{
    this.brandId= event.target.dataset.id
    this._EcomdataService.getSpecificBrand(this.brandId).subscribe({
      next:(res)=>{
        this.SpecificBrand = res.data

      }
    })
  }

}
