import { Component, OnInit, inject } from '@angular/core';
import { ApiServiceClientesService } from '../Services/api-service-clientes.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente, ProyectosList } from '../models/Cliente.model';
import { ApisProyectosServicesService } from '../Services/apis-proyectos-services.service';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.css'
})
export class ClienteDetailComponent implements OnInit {

  private _serviceClientes = inject(ApiServiceClientesService);
  private _serviceProductos = inject(ApisProyectosServicesService);
  private _activedRoute = inject(ActivatedRoute);

  public cliente?:Cliente;
  public proyectosList?:ProyectosList[];
  loading:boolean=true;

  ngOnInit(): void {
    this._activedRoute.params.subscribe(
      params=>{
        this._serviceClientes.getCliente(params['id']).subscribe((data:Cliente)=>{
          this.cliente = data;
          this.loading = false;
        });
      }
    )
    this._serviceProductos.getProductos().subscribe((data:ProyectosList[])=>this.proyectosList=data);
  }
}
