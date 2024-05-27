import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../models/Product.model';
import { ApiServiceClientesService } from '../Services/api-service-clientes.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  

  clienteLinst:Product[]=[];

  private _clienteService = inject(ApiServiceClientesService);

  ngOnInit(): void {
    this._clienteService.getClientes().subscribe((data:Product[])=>this.clienteLinst=data);
  }
}
