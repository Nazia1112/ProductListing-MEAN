import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Product } from './../constants/product';
import { baseURL } from './../constants/config';

import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  pushData(form: any) :Observable<any> {
    console.log(typeof(form));
      return this.http.post<any>(baseURL + 'products', form);
      
  }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + 'products');
  }

  delData(data): Observable<any> {
    console.log(data.SKU);
    return this.http.delete<any>(baseURL + 'products/' + data.SKU);
  }

  getProductParams(data): Observable<any>
  {
    return this.http.post('http://localhost:3000/products/getparam',{"SKU":data},this.httpOptions);
  }

  updateProduct(data): Observable<any>
  {
    return this.http.post('http://localhost:3000/products/updateproduct',data,this.httpOptions);
  }
}
