import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../models/Cliente.model';
import { ClienteService } from '../../cliente-prueba.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent  implements OnInit{

  clienteForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null
  cliente?:Cliente;

  private _clienteServices = inject(ApiServiceClientesService);
  private _activedRouter = inject(ActivatedRoute);
  private _clientePrueba = inject(ClienteService);


  constructor(private fromBuilder:FormBuilder){
    this.clienteForm = this.fromBuilder.group({
      email:['', [Validators.email]],
      nombre: ['', [Validators.minLength(3)]],
      direccion: ['', [Validators.minLength(4)]],
      contacto: ['', [Validators.minLength(10)]],
      referidoPor: ['',[Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // this._activedRouter.params.subscribe(
    //   params => {
    //     this._clienteServices.getCliente(params['id']).subscribe((data:Cliente)=>{
    //       this.cliente=data;
    //     });
    //   }
    // )
    this.cliente=this._clientePrueba.getCliente();
  }
  
  hasErrors(field: string, typeError:string){
    return this.clienteForm.get(field)?.hasError(typeError) && this.clienteForm.get(field)?.touched;
  }

  enviar(event: Event){
    event.preventDefault();
    console.log('Enviado')
    this.clienteForm.get('email')?.setValue('');
    this.clienteForm.get('nombre')?.setValue('');
  }
}
