import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Cliente } from '../../models/Cliente.model';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador-clientes',
  standalone: true,
  imports: [],
  templateUrl: './buscador-clientes.component.html',
  styleUrl: './buscador-clientes.component.css'
})
export class BuscadorClientesComponent implements OnInit{

  clientesLinst:Cliente[]=[];
  clientesSignal = signal<Cliente[]>(this.clientesLinst);

  private _cliernteService = inject(ApiServiceClientesService);
  private _router = inject(Router);

  ngOnInit(): void {
      this._cliernteService.getClientes().subscribe((data:Cliente[])=>this.clientesLinst=data);
  }

  searchTerm = signal('');
  filteredClientes = computed(() =>
    this.clientesSignal().filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      cliente.contacto.includes(this.searchTerm()) ||
      cliente.email.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onDetail(clienteId:number):void{
    this._router.navigate(['cleinte',clienteId]);
  }
}
