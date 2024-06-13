import { Component, OnInit, computed, inject, Input, signal } from '@angular/core';
import { ProyectosList } from '../../models/Cliente.model';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../cliente-prueba.service';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';

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
  clienteId?:number;

  private _proyectosServices = inject(ApisProyectosServicesService);
  private _router = inject(Router);
  private _clienteServices = inject(ApiServiceClientesService);
  private _activatedRouter = inject(ActivatedRoute);
  //private _clientePrueba = inject(ClienteService);

  ngOnInit(): void {
      this.clienteId=this._clienteServices.clienteId;
      this._activatedRouter.params.subscribe(params =>{
        this._proyectosServices.getProyectos(params['clienteId']).subscribe((data:ProyectosList[])=>{
          //this.proyectosList=data;
          this.proyectosSignal = signal<ProyectosList[]>(data);
        })
        console.log(this.proyectosSignal(), "signal proyectos");
      })
      // console.log(this.clienteId);
      // if(this.clienteId){
      //   this._proyectosServices.getProyectos(this.clienteId).subscribe((data:ProyectosList[])=>{
      //     this.proyectosList=data;
      //   })
      //   // this.proyectosList = this._clientePrueba.getProyecto();
      //   this.proyectosSignal = signal<ProyectosList[]>(this.proyectosList);
      // }
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
    console.log(this.filteredProyectos());
  }

  onDetail(proyectoId:number):void{
    this._router.navigate(['proyecto',proyectoId]);
  }
}
