import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceClientesService {

  private _Http = inject(HttpClient);

  private urlBase:string = 'https://fakestoreapi.com/products';

  getClientes():Observable<Product[]>{
    return this._Http.get<Product[]>(this.urlBase);
  }

}
