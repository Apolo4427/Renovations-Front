import { Component, OnInit, inject } from '@angular/core';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-registrar-pago-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './registrar-pago-cliente.component.html',
  styleUrl: './registrar-pago-cliente.component.css'
})
export class RegistrarPagoClienteComponent implements OnInit{

  idProyecto?:number;
  clienteForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null

  private _proyectoServices = inject(ApisProyectosServicesService);
  
  constructor(private fromBuilder:FormBuilder){
    this.clienteForm = this.fromBuilder.group({
      fechaDePago: ['', [Validators.required,Validators.minLength(3)]],
      metodoPago: ['', [Validators.required,Validators.minLength(4)]],
      valorPagado: ['', [Validators.required,Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.idProyecto = this._proyectoServices.idProyecto;
  }

  hasErrors(field: string, typeError:string){
    return this.clienteForm.get(field)?.hasError(typeError) && this.clienteForm.get(field)?.touched;
  }

  enviar(event: Event){
    event.preventDefault();
    console.log('Enviado')
    this.clienteForm.get('email')?.setValue('');
    this.clienteForm.get('mensaje')?.setValue('');
  }
}
