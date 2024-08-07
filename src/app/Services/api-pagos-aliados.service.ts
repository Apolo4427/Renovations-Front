import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaDePagosAliado } from '../models/Cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPagosAliadosService {

  private _Http = inject(HttpClient);

  private urlBase:string = 'http://localhost:8080/clientes';

  getPagosAliados(proyectoId:number):Observable<ListaDePagosAliado[]>{
    return this._Http.get<ListaDePagosAliado[]>(`${this.urlBase}/proyectos/${proyectoId}/pagosAliados`);
  }

  crearPagoAliado(proyectoId:number, pagoAliado:ListaDePagosAliado):Observable<ListaDePagosAliado>{
    return this._Http.post<ListaDePagosAliado>(`${this.urlBase}/proyectos/${proyectoId}/registrarPago`, pagoAliado);
  }
}
