import { Component, OnInit, inject } from '@angular/core';
import { ListaDePagosAliado, ListaDePagosCliente, ProyectosList } from '../models/Cliente.model';
import { ActivatedRoute } from '@angular/router';
import { ApisProyectosServicesService } from '../Services/apis-proyectos-services.service';
import { ApiPagosClienteServicesService } from '../Services/api-pagos-cliente-services.service';
import { ApiPagosAliadosService } from '../Services/api-pagos-aliados.service';

@Component({
  selector: 'app-proyecto-detail',
  standalone: true,
  imports: [],
  templateUrl: './proyecto-detail.component.html',
  styleUrl: './proyecto-detail.component.css'
})
export class ProyectoDetailComponent implements OnInit {
  private _activatedRouter = inject(ActivatedRoute);
  private _serviceProyectos = inject(ApisProyectosServicesService);
  private _servicePagosClientes = inject(ApiPagosClienteServicesService);
  private _sevicePagosAliados = inject(ApiPagosAliadosService);

  public proyecto?:ProyectosList;
  public pagosCleinte?:ListaDePagosCliente[];
  public pagosAliados?:ListaDePagosAliado[];
  loading:boolean = true

  ngOnInit(): void {
      this._activatedRouter.params.subscribe(params=>{
        this._serviceProyectos.getProyecto(params['id']).subscribe((data:ProyectosList)=>{
          this.proyecto=data;
          this.loading=false;
        });
        this._servicePagosClientes.getPagosCliente(params['id']).subscribe((data:ListaDePagosCliente[])=>this.pagosCleinte=data);
        this._sevicePagosAliados.getPagosAliados(params['id']).subscribe((data:ListaDePagosAliado[])=>this.pagosAliados=data);
      })
  }
}
