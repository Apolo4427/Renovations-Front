import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceClientesService {

  private Htt_ = inject(HttpClient);

  private urlBase:string = 'https://fakestoreapi.com/products';

  getClientes():Observable<Product[]>{
    return this.Htt_.get<Product[]>(this.urlBase);
  }

  constructor() { }
}
