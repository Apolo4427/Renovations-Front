import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ListaDePagosCliente } from '../models/Cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPagosClienteServicesService {

  private _Http = inject(HttpClient);

  private urlBase:string = 'https://localhost:8080/clientes';

  getPagosCliente(proyectoId:number):Observable<ListaDePagosCliente[]>{
    return this._Http.get<ListaDePagosCliente[]>(`${this.urlBase}/proyectos/${proyectoId}/pagosClientes`);
  }

  // getPagoCliente(id:number):Observable<ListaDePagosCliente>{
  //   return this._Http.get<ListaDePagosCliente>(`${this.urlBase}/${id}`);
  // }
  
}
