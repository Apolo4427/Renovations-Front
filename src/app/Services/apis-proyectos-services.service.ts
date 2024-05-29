import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProyectosList } from '../models/Cliente.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisProyectosServicesService {

  private _Http = inject(HttpClient);

  private urlBase:string = 'https://localhost:8080/clientes';

  getProyectos(clienteId:number):Observable<ProyectosList[]>{
    return this._Http.get<ProyectosList[]>(`${this.urlBase}/proyectos/${clienteId}`);
  }

  getProyecto(proyectoId:number):Observable<ProyectosList>{
    return this._Http.get<ProyectosList>(`${this.urlBase}/proyectos/${proyectoId}`);
  }
}
