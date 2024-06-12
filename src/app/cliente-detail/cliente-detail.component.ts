import { Component, Injectable, OnInit, inject } from '@angular/core';
import { ApiServiceClientesService } from '../Services/api-service-clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ProyectosList } from '../models/Cliente.model';
import { ApisProyectosServicesService } from '../Services/apis-proyectos-services.service';
import { BuscadorProyectosComponent } from '../Buscadores/buscador-proyectos/buscador-proyectos.component';
import { ClienteService } from '../cliente-prueba.service';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [BuscadorProyectosComponent],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.css'
})
export class ClienteDetailComponent implements OnInit {

  private _serviceClientes = inject(ApiServiceClientesService);
  private _serviceProductos = inject(ApisProyectosServicesService);
  private _activedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  //private _clientePrueba = inject(ClienteService);

  public cliente?:Cliente;
  clienteId:number=0;
  public proyectosList?:ProyectosList[];
  loading:boolean=true;

  ngOnInit(): void {
    this._activedRoute.params.subscribe(
      params=>{
        this.clienteId=+params['clienteId'];
        console.log(params['clienteId']);
        this._serviceClientes.getCliente(this.clienteId).subscribe((data:Cliente)=>{
          this.cliente = data;
          this.loading = false;
        });
        this._serviceProductos.getProyectos(this.clienteId).subscribe((data:ProyectosList[])=>this.proyectosList=data);
      }
    )
    // this.cliente=this._clientePrueba.getCliente();
    // this.loading = false;
    // this.proyectosList=this._clientePrueba.getProyecto();
  }

  onDetail(proyectoId:number):void{
    this._router.navigate(['proyecto',proyectoId]);
  }

  onNuevoProyecto():void{
    this._serviceClientes.clienteEmail=this.cliente?.email;
    this._serviceClientes.clienteId = this.cliente?.id;
    this._router.navigate(['registrarProyecto']);
  }

  onComponent(component:string, clienteId:number | undefined){
    this._router.navigate([component,clienteId]);
  }

  copiarCorreo(clienteEmail:string | undefined):void{
    if(clienteEmail){
      navigator.clipboard.writeText(clienteEmail).then(() => {
        alert('Correo copiado al portapapeles.');
      }).catch(err => {
        console.error('Error al copiar el texto: ', err);
      });
    }
  }
}
