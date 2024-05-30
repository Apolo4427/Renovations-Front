import { Component, OnInit, computed, inject, Input, signal } from '@angular/core';
import { ProyectosList } from '../../models/Cliente.model';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './buscador-proyectos.component.html',
  styleUrl: './buscador-proyectos.component.css'
})
export class BuscadorProyectosComponent implements OnInit{

  proyectosList:ProyectosList[]=[];
  proyectosSignal = signal<ProyectosList[]>(this.proyectosList);
  @Input() clienteId?:number;

  private _proyectosServices = inject(ApisProyectosServicesService);
  private _router = inject(Router);

  ngOnInit(): void {
      if(this.clienteId){
        this._proyectosServices.getProyectos(this.clienteId).subscribe((data:ProyectosList[])=>{
          this.proyectosList=data;
        })
      }
  }

  searchTerm = signal('');
  filteredProyectos = computed(() =>
    this.proyectosSignal().filter(proyecto =>
      proyecto.numeroContrato.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onDetail(proyectoId:number):void{
    this._router.navigate(['proyectos',proyectoId]);
  }
}
