import { Component, OnInit, inject } from '@angular/core';
import { Cliente } from '../models/Cliente.model';
import { ApiServiceClientesService } from '../Services/api-service-clientes.service';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente-prueba.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  
  clientesList:Cliente[]=[];

  //private _clienteService = inject(ApiServiceClientesService);
  private _clientePrueba = inject(ClienteService);
  private _router = inject(Router);

  ngOnInit(): void {
    // this._clienteService.getClientes().subscribe((data:Cliente[])=>this.clientesList=data);
    // console.log(this.clientesList);
    this.clientesList = [this._clientePrueba.getCliente()];
  }

  onDetail(clienteId:number):void{
    this._router.navigate(['cliente',clienteId]);
  }
}
