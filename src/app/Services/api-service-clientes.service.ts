import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../models/Cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceClientesService {

  private _Http = inject(HttpClient);

  private urlBase:string = 'https://localhost:8080/clientes';

  getClientes():Observable<Cliente[]>{
    return this._Http.get<Cliente[]>(this.urlBase);
  }

  getCliente(id:number):Observable<Cliente>{
    return this._Http.get<Cliente>(`${this.urlBase}/${id}`);
  }

}
