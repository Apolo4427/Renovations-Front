import { Component, OnInit, inject } from '@angular/core';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgClass } from '@angular/common';
import { ProyectosList } from '../../models/Cliente.model';
import { ApiPagosClienteServicesService } from '../../Services/api-pagos-cliente-services.service';

@Component({
  selector: 'app-registrar-pago-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './registrar-pago-cliente.component.html',
  styleUrl: './registrar-pago-cliente.component.css'
})
export class RegistrarPagoClienteComponent implements OnInit{

  idProyecto?:number;
  pagoClienteForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null
  proyecto?:ProyectosList;
  loading:boolean = true;

  private _proyectoServices = inject(ApisProyectosServicesService);
  private _pagosDeClienteServices = inject(ApiPagosClienteServicesService);
  private _location = inject(Location);
  
  constructor(private fromBuilder:FormBuilder){
    this.pagoClienteForm = this.fromBuilder.group({
      fecha_pago: ['', [Validators.required,Validators.minLength(3)]],
      metodo_pago: ['', [Validators.required,Validators.minLength(4)]],
      valor_pagado: ['', [Validators.required,Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.idProyecto = this._proyectoServices.idProyecto;
    if(this.idProyecto){
      this._proyectoServices.getProyecto(this.idProyecto).subscribe((data:ProyectosList)=>{
        this.proyecto = data;
        this.loading = false;
      })
    }
  }

  hasErrors(field: string, typeError:string){
    return this.pagoClienteForm.get(field)?.hasError(typeError) && this.pagoClienteForm.get(field)?.touched;
  }

  enviar(event: Event){
    event.preventDefault();
    console.log('Enviado')
    if(!this.loading && this.pagoClienteForm.valid && this.idProyecto){
      const pagoCliente = this.pagoClienteForm.value;
      this._pagosDeClienteServices.crearPagoCliente(this.idProyecto,pagoCliente).subscribe(
        response => {
          console.log('Se ha registrado el pago del cliente: ',response);
          alert('Se ha registrado el pago del cliente correctamente');
          this._location.back();
        }, error => {
          console.error('Error al registrar el cliente:', error);
        }
      )
    }else {
      alert('No se ha llenado el formulario correctamente.');
    }
  }
}
