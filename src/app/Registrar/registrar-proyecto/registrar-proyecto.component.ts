import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { ProyectosList } from '../../models/Cliente.model';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-registrar-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './registrar-proyecto.component.html',
  styleUrl: './registrar-proyecto.component.css'
})
export class RegistrarProyectoComponent implements OnInit{

  clienteId?:number;
  clienteEmail?:string;
  proyectoForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null
  loading:boolean=true;
  numeroExistente:boolean = false;
  proyectosCliente:ProyectosList[]=[];
  valorAprovado?:string;

  private _clienteServices = inject(ApiServiceClientesService);
  private _proyectosServices = inject(ApisProyectosServicesService);
  private _router = inject(Router);

  constructor(private fromBuilder:FormBuilder){
    this.proyectoForm = this.fromBuilder.group({
      clienteIdform: [''],
      numeroContrato:['', [Validators.required,Validators.minLength(3)]],
      fecha_estimado: ['', [Validators.required,Validators.minLength(3)]],
      fecha_inicio: ['', [Validators.minLength(3)]],
      contratante: ['', [Validators.required,Validators.minLength(4)]],
      emailCliente: [''],
      valor_aprovado: ['', [Validators.minLength(3)]],
      fechaDePago_velorAprovado: ['', [Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
      this.clienteEmail = this._clienteServices.clienteEmail;
      this.clienteId = this._clienteServices.clienteId;
      if(this.clienteId){
        this._proyectosServices.getProyectos(this.clienteId).subscribe((data:ProyectosList[])=>{
          this.proyectosCliente=data;
          this.loading = false;
        })
      }
  }

  hasErrors(field: string, typeError:string){
    return this.proyectoForm.get(field)?.hasError(typeError) && this.proyectoForm.get(field)?.touched;
  }

  enviar(event: Event){
    event.preventDefault();
    if(!this.loading){
      const numeroContraro = this.proyectoForm.get('numeroContrato')?.value;
      for(let i=0;i<this.proyectosCliente.length;i++){
        if(numeroContraro==this.proyectosCliente[i].numeroContrato){
          alert('Ese numero de contrato ya se encuentra registrado');
          this.numeroExistente = true;
          this._router.navigate(['cliente',this.clienteId]);
          break;
        }
      }if(this.proyectoForm.valid && !this.numeroExistente && this.clienteId){
        this.proyectoForm.get('emailCliente')?.setValue(this.clienteEmail);
        const {clienteIdform, ...nuevoProyecto} = this.proyectoForm.value;
        this.valorAprovado = this.proyectoForm.get('valor_aprovado')?.value;
        if(Number(this.valorAprovado)){
          this._proyectosServices.crearProyecto(this.clienteId, nuevoProyecto).subscribe(
            response => {
              console.log('Proyecto registrado:', response);
              alert('El proyecto se ha registrado correctamente.');
              this._router.navigate(['cliente', this.clienteId]);
            },error => {
              console.error('Error al registrar el proyecto:', error);
              if (error.status === 400) {
                alert('Ese número de contrato ya existe.');
              } else {
                alert('Hubo un error al registrar el proyecto.');
              }
            }
          );
        }else{
          alert('El valor aprovado debe ser un numero entero');
        }
      }else {
        console.log('Formulario no válido o clienteId undefined');
      }
    }
  }
}
