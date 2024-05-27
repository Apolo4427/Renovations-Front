import { Component, OnInit, inject } from '@angular/core';
import { ApiServiceClientesService } from '../Services/api-service-clientes.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../models/Cliente.model';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.css'
})
export class ClienteDetailComponent implements OnInit {

  private _service = inject(ApiServiceClientesService);
  private _activedRoute = inject(ActivatedRoute);

  public cliente?:Cliente;
  loading:boolean=true;

  ngOnInit(): void {
    this._activedRoute.params.subscribe(
      params=>{
        this._service.getCliente(params['id']).subscribe((data:Cliente)=>{
          this.cliente = data;
          this.loading = false;
        });
      }
    )
  }
}
