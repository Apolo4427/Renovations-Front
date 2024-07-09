import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { NgClass } from '@angular/common';
import { ApiPagosAliadosService } from '../../Services/api-pagos-aliados.service';

@Component({
  selector: 'app-pago-aliado',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './pago-aliado.component.html',
  styleUrl: './pago-aliado.component.css'
})
export class PagoAliadoComponent implements OnInit {

  idProyecto?:number;
  clienteForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null

  private _proyectoServices = inject(ApisProyectosServicesService);
  private _pagosAliadosServices = inject(ApiPagosAliadosService);
  
  constructor(private fromBuilder:FormBuilder){
    this.clienteForm = this.fromBuilder.group({
      fechaDePago: ['', [Validators.required,Validators.minLength(3)]],
      empresaAliada: ['', [Validators.required,Validators.minLength(4)]],
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
    //IMPLEMENTAR LOGICA PARA GUARDAR LOS PAGOS REGISTRADOS EN EL FORMULARIO
  }

}
