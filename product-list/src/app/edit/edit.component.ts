import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import {ProductService} from '../services/product.service';

import {MAT_DIALOG_DATA} from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../constants/product';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm=this.fb.group({
    name:['',[Validators.required,Validators.maxLength(20)]],
    SKU : [''],
    quantity : ['',[Validators.required,Validators.maxLength(6)]]
  });
  
  constructor(private fb:FormBuilder,private srv:ProductService,
              @Inject(MAT_DIALOG_DATA) public data: any ,
              public dialogRef : MatDialogRef<ProductListComponent>
            ) { }

  ngOnInit() {
    
    this.srv.getProductParams(this.data).subscribe((res)=>{
      
      this.editForm.patchValue({
        name:res.name,
        SKU:res.SKU,
        quantity:res.quantity
      });


    })
    
  }
 
  cancel()
  {
    this.dialogRef.close();
  }
  submitHandler()
  {
    this.dialogRef.close(this.editForm.value);
  }
}