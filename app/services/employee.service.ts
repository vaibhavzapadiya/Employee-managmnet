import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product, ProductServiceService } from '../product-service.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  searchInput = new FormControl('');

  products:Product[]=[];
  constructor(private productService:ProductServiceService) {

  }
  ngOnInit(): void {
    if(this.searchInput.value){
      this.searchInput.valueChanges.subscribe((value) => {
        this.productService.searchProducts(value!).subscribe((data)=>{   
          this.products=data;
        })
      })  
      }
    else{
      this.products=this.productService.products;
    } 
    
  }




  }

