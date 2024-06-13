import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { Cliente } from '../../models/Cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent implements OnInit {

  clienteForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null
  clientes:Cliente[]=[];
  loading:boolean = true;
  emailExistente:boolean = false;

  private _clienteServices = inject(ApiServiceClientesService);
  private _router = inject(Router);

  constructor(private fromBuilder:FormBuilder){
    this.clienteForm = this.fromBuilder.group({
      email:['', [Validators.required,Validators.email]],
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      direccion: ['', [Validators.required,Validators.minLength(4)]],
      contacto: ['', [Validators.required,Validators.minLength(10)]],
      referidoPor: ['', [Validators.minLength(3)]]
    });
  }
  ngOnInit(): void {
    this._clienteServices.getClientes().subscribe((data:Cliente[])=>{
      this.clientes=data;
      this.loading = false;
    })
  }

  hasErrors(field: string, typeError:string){
    return this.clienteForm.get(field)?.hasError(typeError) && this.clienteForm.get(field)?.touched;
  }

  enviar(event: Event){
    event.preventDefault();
    const email = this.clienteForm.get('email')?.value;
    //Registrar cliente atravez del metodo POST
    //VALIDAR QUE EL CORREO NO EXISTA ANTERIORMENTE
    if(!this.loading){//clientes cargados
      for(let i=0;i<this.clientes.length;i++){//recorrer
        if(this.clientes[i].email==email){
          alert('Ese email ya se encuentra registrado.');
          this.emailExistente = true;//indicamos que el email ya se encuntra en la lista de clientes
          break
        }
      }
      if (this.clienteForm.valid && !this.emailExistente) {
        const nuevoCliente: Cliente = this.clienteForm.value;
        this._clienteServices.crearCliente(nuevoCliente).subscribe(
          response => {
            console.log('Cliente registrado:', response);
            alert('Cliente registrado');
            this._router.navigate(['cliente']);
          },
          error => {
            console.error('Error al registrar el cliente:', error);
          }
        );
      } else {
        console.log('Formulario no válido');
      }
    }
  }
}
