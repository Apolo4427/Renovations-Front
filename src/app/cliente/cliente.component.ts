import { Component, OnInit, inject } from '@angular/core';
import { Cliente } from '../models/Cliente.model';
import { ApiServiceClientesService } from '../Services/api-service-clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  
  clienteList:Cliente[]=[];

  private _clienteService = inject(ApiServiceClientesService);
  private _router = inject(Router);

  ngOnInit(): void {
    this._clienteService.getClientes().subscribe((data:Cliente[])=>this.clienteList=data);
    console.log(this.clienteList);
  }

  onDetail(id:number):void{
    this._router.navigate(['cleinte',id]);
  }
}
