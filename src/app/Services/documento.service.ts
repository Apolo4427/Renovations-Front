import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Documento } from '../models/Cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private _Http = inject(HttpClient);

  private urlBase:string = 'http://localhost:8080/clientes';

  getDocumentos(proyectoId:number):Observable<Documento[]>{
    return this._Http.get<Documento[]>(`${this.urlBase}/proyectos/${proyectoId}/documentos`);
  }
  
  // getDocumento(proyectoId:number):Observable<Documento>{
  //   return this._Http.get<Documento>(`${this.urlBase}/proyectos/${proyectoId}/documento`);
  // }
}
