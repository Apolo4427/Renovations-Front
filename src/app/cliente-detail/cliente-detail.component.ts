import { Component, OnInit, inject } from '@angular/core';
import { ApiServiceClientesService } from '../Services/api-service-clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ProyectosList } from '../models/Cliente.model';
import { ApisProyectosServicesService } from '../Services/apis-proyectos-services.service';
import { BuscadorProyectosComponent } from '../Buscadores/buscador-proyectos/buscador-proyectos.component';

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

  public cliente?:Cliente;
  clienteId?:number;
  public proyectosList?:ProyectosList[];
  loading:boolean=true;

  ngOnInit(): void {
    this._activedRoute.params.subscribe(
      params=>{
        this._serviceClientes.getCliente(params['id']).subscribe((data:Cliente)=>{
          this.cliente = data;
          this.loading = false;
        });
        this._serviceProductos.getProyectos(params['id']).subscribe((data:ProyectosList[])=>this.proyectosList=data);
        this.clienteId=params['id'];
      }
    )
    
  }

  onDetail(proyectoId:number):void{
    this._router.navigate(['proyecto',proyectoId]);
  }
}
