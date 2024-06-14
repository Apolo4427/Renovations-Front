import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProyectosList } from '../models/Cliente.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisProyectosServicesService {

  idProyecto?:number;

  private _Http = inject(HttpClient);

  private urlBase:string = 'http://localhost:8080/clientes';

  getProyectos(clienteId:number):Observable<ProyectosList[]>{
    return this._Http.get<ProyectosList[]>(`${this.urlBase}/proyectos/list/${clienteId}`);
  }

  getProyecto(proyectoId:number):Observable<ProyectosList>{
    return this._Http.get<ProyectosList>(`${this.urlBase}/proyectos/${proyectoId}`);
  }

  crearProyecto(clienteId:number, proyecto:ProyectosList):Observable<ProyectosList>{
    return this._Http.post<ProyectosList>(`${this.urlBase}/proyectos/${clienteId}/nuevoProyecto`, proyecto);
  }

  actualizarProyecto(proyectoId:number, proyecto:ProyectosList):Observable<ProyectosList>{
    return this._Http.patch<ProyectosList>(`${this.urlBase}/proyectos/${proyectoId}/editarProyecto`, proyecto);
  }
}
