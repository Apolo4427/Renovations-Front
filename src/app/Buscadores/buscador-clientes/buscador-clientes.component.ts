import { Component, ElementRef, OnInit, Renderer2, ViewChild, computed, inject, signal } from '@angular/core';
import { Cliente } from '../../models/Cliente.model';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../cliente-prueba.service';

@Component({
  selector: 'app-buscador-clientes',
  standalone: true,
  imports: [],
  templateUrl: './buscador-clientes.component.html',
  styleUrl: './buscador-clientes.component.css'
})
export class BuscadorClientesComponent implements OnInit{

  // @ViewChild('buscador', { static: false }) buscador!: ElementRef;

  clientesLinst:Cliente[]=[];
  clientesSignal = signal<Cliente[]>([]);

  private _render = inject(Renderer2);
  //private _cliernteService = inject(ApiServiceClientesService);
  private _router = inject(Router);
  private _clientePrueba = inject(ClienteService);

  ngOnInit(): void {
  //    this._cliernteService.getClientes().subscribe((data:Cliente[])=>this.clientesLinst=data);
      this.clientesLinst= [this._clientePrueba.getCliente()];
      this.clientesSignal = signal<Cliente[]>(this.clientesLinst);
  }

  searchTerm = signal('');
  filteredClientes = computed(() =>
    this.clientesSignal().filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      cliente.email.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  isSearchNonEmpty() {
    return this.searchTerm().trim() !== '';
  }

  onDetail(clienteId:number):void{
    this.searchTerm.set('');
    this._router.navigate(['cliente',clienteId]);
    // this._render.setProperty(this.buscador, 'value', '');
  }
}
