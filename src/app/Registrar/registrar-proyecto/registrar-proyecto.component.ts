import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';

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

  private _clienteServices = inject(ApiServiceClientesService);

  constructor(private fromBuilder:FormBuilder){
    this.proyectoForm = this.fromBuilder.group({
      numeroContrato:['', [Validators.required,Validators.minLength(4)]],
      fechaEstimado: ['', [Validators.required,Validators.minLength(3)]],
      fechaInicio: ['', [Validators.minLength(3)]],
      contratante: ['', [Validators.required,Validators.minLength(4)]],
      emailCliente: [''],
      valorAprobado: ['', [Validators.minLength(3)]],
      fechaDePagoValorAprobado: ['', [Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
      this.clienteEmail = this._clienteServices.clienteEmail;
      this.clienteId = this._clienteServices.clienteId;
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
