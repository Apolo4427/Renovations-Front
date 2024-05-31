import { Component, OnInit, computed, inject, Input, signal } from '@angular/core';
import { ProyectosList } from '../../models/Cliente.model';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../cliente-prueba.service';

@Component({
  selector: 'app-buscador-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './buscador-proyectos.component.html',
  styleUrl: './buscador-proyectos.component.css'
})
export class BuscadorProyectosComponent implements OnInit{

  proyectosList:ProyectosList[] = [] ;
  proyectosSignal = signal<ProyectosList[]>([]);
  @Input() clienteId?:number;

  private _proyectosServices = inject(ApisProyectosServicesService);
  private _router = inject(Router);
  //private _clientePrueba = inject(ClienteService);

  ngOnInit(): void {
      if(this.clienteId){
        this._proyectosServices.getProyectos(this.clienteId).subscribe((data:ProyectosList[])=>{
          this.proyectosList=data;
        })
        // this.proyectosList = this._clientePrueba.getProyecto();
        // this.proyectosSignal = signal<ProyectosList[]>(this.proyectosList);
      }
  }

  searchTerm = signal('');
  filteredProyectos = computed(() =>
    this.proyectosSignal().filter(proyecto =>
      proyecto.numeroContrato.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  isSearchNonEmpty() {
    return this.searchTerm().trim() !== '';
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onDetail(proyectoId:number):void{
    this._router.navigate(['proyectos',proyectoId]);
  }
}
