import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { ProyectosList } from '../../models/Cliente.model';
import { ClienteService } from '../../cliente-prueba.service';

@Component({
  selector: 'app-editar-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './editar-proyecto.component.html',
  styleUrl: './editar-proyecto.component.css'
})
export class EditarProyectoComponent implements OnInit {

  proyectoForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null
  proyecto?:ProyectosList;
  loading:boolean=true;

  private _proyectoServices = inject(ApisProyectosServicesService);
  private _activatedRouter = inject(ActivatedRoute);
  private _router = inject(Router);
  //private _clientePrueba = inject(ClienteService);

  constructor(private fromBuilder:FormBuilder){
    this.proyectoForm = this.fromBuilder.group({
      numeroContrato:['', [Validators.minLength(4)]],
      fecha_estimado: ['', [Validators.minLength(3)]],
      fecha_inicio: ['', [Validators.minLength(4)]],
      contratante: ['', [Validators.minLength(3)]],
      emailCliente: [''],
      valor_aprovado: ['', [Validators.minLength(3)]],
      fechaDePago_velorAprovado: ['', [Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
      this._activatedRouter.params.subscribe(params => {
        this._proyectoServices.getProyecto(params['proyectoId']).subscribe((data:ProyectosList)=>{
          this.proyecto = data;
        });
        this.loading=false;
      })
      //this.proyecto = this._clientePrueba.getProyecto().find((obj:ProyectosList)=>obj.proyectoId==101);
  }

  hasErrors(field: string, typeError:string){
    return this.proyectoForm.get(field)?.hasError(typeError) && this.proyectoForm.get(field)?.touched;
  }

  enviar(event: Event, proyectoId:number | undefined){
    event.preventDefault();
    console.log('Enviado');
    if(!this.loading && this.proyectoForm.valid && proyectoId){
      const {emailCliente, numeroContrato, ...proyectoActualizado} = this.proyectoForm.value;
      console.log(proyectoActualizado);
      this._proyectoServices.actualizarProyecto(proyectoId, proyectoActualizado).subscribe(
        respose =>{
          console.log('Proyecto actualizado', respose)
          alert('El proyecto ha sido actualizado con exito.');
          this._router.navigate(['proyecto', proyectoId]);
        },error =>{
          console.log('Error: ', error);
          alert('Ha ocurrido un error');
        }
      )
    }
  }
}
