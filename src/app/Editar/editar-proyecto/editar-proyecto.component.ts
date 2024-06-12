import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { ActivatedRoute } from '@angular/router';
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

  private _proyectoServices = inject(ApisProyectosServicesService);
  private _activatedRouter = inject(ActivatedRoute);
  //private _clientePrueba = inject(ClienteService);

  constructor(private fromBuilder:FormBuilder){
    this.proyectoForm = this.fromBuilder.group({
      numeroContrato:['', [Validators.minLength(4)]],
      fechaEstimado: ['', [Validators.minLength(3)]],
      fechaInicio: ['', [Validators.minLength(4)]],
      contratante: ['', [Validators.minLength(3)]],
      emailCliente: [''],
      valorAprobado: ['', [Validators.minLength(3)]],
      fechaDePagoValorAprobado: ['', [Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
      this._activatedRouter.params.subscribe(params => {
        this._proyectoServices.getProyecto(params['id']).subscribe((data:ProyectosList)=>{
          this.proyecto = data;
        });
      })
      //this.proyecto = this._clientePrueba.getProyecto().find((obj:ProyectosList)=>obj.proyectoId==101);
  }

  hasErrors(field: string, typeError:string){
    return this.proyectoForm.get(field)?.hasError(typeError) && this.proyectoForm.get(field)?.touched;
  }

  enviar(event: Event){
    event.preventDefault();
    console.log('Enviado')
    this.proyectoForm.get('email')?.setValue('');
    this.proyectoForm.get('mensaje')?.setValue('');
  }
}
