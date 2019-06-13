import { Component, OnInit } from '@angular/core';
import { EditComponent } from '../edit/edit.component';

import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

import { Product } from '../constants/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  todaydate: any = new Date();
  form: FormGroup;
  limitExceeded = false;
  creds: FormArray;
  count: number = 0;
  disable: boolean = false;

  response: Product[];

  name: FormControl;
  SKU: FormControl;
  quantity: FormControl;

  constructor(private fb: FormBuilder, private productService: ProductService, public dialog: MatDialog) {
    this.form = this.fb.group({
      entries: this.fb.array([]),
    });
    // console.log(this.form.controls.entries);
    // console.log(this.form.get('entries'));
  }

  ngOnInit() {
    this.productService.getData().subscribe(res => this.response = res);


  }

  addCreds() {

    this.creds = this.form.controls.entries as FormArray;
    if (this.creds.length <= 4) {
      this.creds.push(this.fb.group({
        name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
        SKU: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
        quantity: [1, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
      }));
      this.count++;
      if (this.count > 4) {
        this.disable = true;
      }
    }

  }

  removeProduct(index: number) {

    console.log(this.creds)
    this.creds.removeAt(index);
    //console.log(this.creds)
    console.log(index);
    this.count--;
    this.disable = false;
  }

  productSave() {

    let values = this.form.get('entries').value;
    console.log(values);

    alert('Added Successfully')
    this.productService.pushData(values).subscribe(res => {
      console.log(res);
      console.log(this.creds);
      this.productService.getData().subscribe(res => this.response = res);
    });;

    this.form.reset({
      name: '',
      SKU: '',
      quantity: '',
    });

  }

  editProduct(data) {

    let dialogRef = this.dialog.open(EditComponent, {
      height: '500px',
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe((data) => {

      console.log(data);

      if (data != undefined) {
        this.productService.updateProduct(data).subscribe((res) => {
          if (res.status == 200) {
            alert("Done");
            this.productService.getData().subscribe(res => this.response = res);
          }
          else {
            alert("Error");
          }
        });
      }
    });

  }

  deleteProduct(data) {
    // console.log(data);
    this.productService.delData({ "SKU": data }).subscribe((data) => {
      console.log(data);
      if (data['deleted']) {
        alert('Product Deleted');
        console.log(data['data']);
        this.response = data['data'];
      }
      else {
        alert('Error in Deletion');
      }
    });
  };



  trackByFn(index: any, item: any) {
    return index;
  }

}
