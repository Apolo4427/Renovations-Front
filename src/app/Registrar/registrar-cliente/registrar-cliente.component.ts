import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent {

  clienteForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null

  constructor(private fromBuilder:FormBuilder){
    this.clienteForm = this.fromBuilder.group({
      email:['', [Validators.required,Validators.email]],
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      direccion: ['', [Validators.required,Validators.minLength(4)]],
      contacto: ['', [Validators.required,Validators.minLength(10)]]
    });
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
