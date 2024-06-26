import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceClientesService } from '../../Services/api-service-clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  clienteEmail?:string;
  clientesList:Cliente[]=[];
  loading:boolean=true;
  emailExistente:boolean = false;

  private _clienteServices = inject(ApiServiceClientesService);
  private _activedRouter = inject(ActivatedRoute);
  private _router = inject(Router);
  //private _clientePrueba = inject(ClienteService);


  constructor(private fromBuilder:FormBuilder){
    this.clienteForm = this.fromBuilder.group({
      email:['', [Validators.email]],
      nombre: ['', [Validators.minLength(3)]],
      direccion: ['', [Validators.minLength(4)]],
      contacto: ['', [Validators.minLength(10)]],
      referido_por: ['',[Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this._activedRouter.params.subscribe(
      params => {
        this._clienteServices.getCliente(params['clienteId']).subscribe((data:Cliente)=>{
          this.cliente=data;
          this.clienteEmail=this._clienteServices.clienteEmail;
        });
        this._clienteServices.getClientes().subscribe((data:Cliente[])=>{
          this.clientesList = data;
          this.loading = false;
        });
      }
    )
    //this.cliente=this._clientePrueba.getCliente();
  }
  
  hasErrors(field: string, typeError:string){
    return this.clienteForm.get(field)?.hasError(typeError) && this.clienteForm.get(field)?.touched;
  }

  enviar(event: Event, clienteId:number | undefined):void{
    event.preventDefault();
    let emailActualizado = this.clienteForm.get('email')?.value;
    if(!this.loading && clienteId){
      for(let i =0; i<this.clientesList.length;i++){
        if(this.clientesList[i].email==emailActualizado){
          alert('Ese email ya se encuentra registrado.');
          this.emailExistente = true;//indicamos que el email ya se encuntra en la lista de clientes
          this._router.navigate(['cliente',clienteId]);
          break;
        } 
        // borrar
      // }console.log(emailActualizado, emailActualizado.trim().length === 0, emailActualizado === null);
      // emailActualizado = this.clienteForm.get('emailCliente')?.setValue(this.clienteEmail);
      // console.log(emailActualizado, 'email actualizado');
      // console.log(this.clienteEmail);
      // const {email, ...clienteActualizado} = this.clienteForm.value;
      // console.log(clienteActualizado);
      }if (this.clienteForm.valid && !this.emailExistente){
        if(emailActualizado.trim().length=== 0 || emailActualizado === null){
          //emailActualizado = this.cliente?.email;
          const {email, ...clienteActualizado} = this.clienteForm.value;
          this._clienteServices.actualizarCliente(clienteActualizado, clienteId).subscribe(
            response => {
              console.log('Cliente registrado:', response);
              alert('Cliente actualizado correctamente');
              this._router.navigate(['cliente',clienteId]);
            },
            error => {
              console.error('Error al registrar el cliente:', error);
            }
          );
        }else{
          const clienteActualizado:Cliente = this.clienteForm.value; 
          this._clienteServices.actualizarCliente(clienteActualizado, clienteId).subscribe(
          response => {
            console.log('Cliente registrado:', response);
            alert('Cliente actualizado correctamente');
            this._router.navigate(['cliente',clienteId]);
          },
          error => {
            console.error('Error al registrar el cliente:', error);
          }
        );
        } 
      }else {
        console.log('Formulario no válido');
      }
    }
    
  }
}
