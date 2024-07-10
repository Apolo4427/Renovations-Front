import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApisProyectosServicesService } from '../../Services/apis-proyectos-services.service';
import { Location, NgClass } from '@angular/common';
import { ApiPagosAliadosService } from '../../Services/api-pagos-aliados.service';
import { ProyectosList } from '../../models/Cliente.model';

@Component({
  selector: 'app-pago-aliado',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './pago-aliado.component.html',
  styleUrl: './pago-aliado.component.css'
})
export class PagoAliadoComponent implements OnInit {

  idProyecto?:number;
  proyecto?:ProyectosList;
  pagoAliadoForm!: FormGroup;//"!" significa que nos comprometemos a que nunca sea null
  loading:boolean=true;
  valorPagadoACompañia?:string;

  private _proyectoServices = inject(ApisProyectosServicesService);
  private _pagosAliadosServices = inject(ApiPagosAliadosService);
  private _location = inject(Location);
  
  constructor(private fromBuilder:FormBuilder){
    this.pagoAliadoForm = this.fromBuilder.group({
      fechaDePago: ['', [Validators.required,Validators.minLength(3)]],
      empresaAliada: ['', [Validators.required,Validators.minLength(4)]],
      valorPagado: ['', [Validators.required,Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.idProyecto = this._proyectoServices.idProyecto;
    if(this.idProyecto){
      this._proyectoServices.getProyecto(this.idProyecto).subscribe((data:ProyectosList)=>{
        this.proyecto=data;
        this.loading=false
      })
    }
  }

  hasErrors(field: string, typeError:string){
    return this.pagoAliadoForm.get(field)?.hasError(typeError) && this.pagoAliadoForm.get(field)?.touched;
  }

  enviar(event: Event){
    event.preventDefault();
    console.log('Enviado')
    if(!this.loading && this.pagoAliadoForm.valid && this.idProyecto){
      const pagoAliado = this.pagoAliadoForm.value;
      this.valorPagadoACompañia = this.pagoAliadoForm.get('valorPagado')?.value;
      if(Number(this.valorPagadoACompañia)){
        this._pagosAliadosServices.crearPagoAliado(this.idProyecto, pagoAliado).subscribe(
          response => {
            console.log('se ha registrado el pago: ', response);
            alert('Se ha registrado el pago correctamente');
            this._location.back();
          }, error =>{
            console.error('Error al registrar el cliente:', error);
          }
        )
      }else{
        alert('El valor pagado debe ser un numero entero');
      }
    }else{
      alert('No se ha llenado el formulario correctamente');
    }
  }

}
