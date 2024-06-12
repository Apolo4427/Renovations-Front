import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { Cliente } from '../../models/Cliente.model';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent {

  clienteForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null
  private _clienteServices = inject(ApiServiceClientesService);

  constructor(private fromBuilder:FormBuilder){
    this.clienteForm = this.fromBuilder.group({
      email:['', [Validators.required,Validators.email]],
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      direccion: ['', [Validators.required,Validators.minLength(4)]],
      contacto: ['', [Validators.required,Validators.minLength(10)]],
      referidoPor: ['', [Validators.minLength(3)]]
    });
  }

  hasErrors(field: string, typeError:string){
    return this.clienteForm.get(field)?.hasError(typeError) && this.clienteForm.get(field)?.touched;
  }

  enviar(event: Event){
    event.preventDefault();
    console.log('Enviado')
    //Registrar cliente atravez del metodo POST
    event.preventDefault();
    if (this.clienteForm.valid) {
      const nuevoCliente: Cliente = this.clienteForm.value;
      this._clienteServices.crearCliente(nuevoCliente).subscribe(
        response => {
          console.log('Cliente registrado:', response);
          alert('Cliente registrado');
        },
        error => {
          console.error('Error al registrar el cliente:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error
        }
      );
    } else {
      console.log('Formulario no válido');
      // Aquí puedes manejar el caso en que el formulario no sea válido
    }
  }
}
