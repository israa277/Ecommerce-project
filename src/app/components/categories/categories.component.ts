import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interface/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService ){}
  categery:Category[] = []
  ngOnInit(): void {
      this._EcomdataService.getCategories().subscribe({
        next:(res)=>{
          this.categery = res.data


        }
      })
  }

}
