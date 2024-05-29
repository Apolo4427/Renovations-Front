import { Component, OnInit, inject } from '@angular/core';
import { ApiServiceClientesService } from '../Services/api-service-clientes.service';

@Component({
  selector: 'app-correos',
  standalone: true,
  imports: [],
  templateUrl: './correos.component.html',
  styleUrl: './correos.component.css'
})
export class CorreosComponent implements OnInit{
  private _clientesServices = inject(ApiServiceClientesService);

  correosList:string[]=[];
  correosNoCargados = true;

  ngOnInit(): void {
      this.correosNoCargados=true;
  }

  onAllCorreos():void{
    this._clientesServices.getAllCorreosClientes().subscribe((data:string[])=>{
      this.correosList=data;
    });
    this.correosNoCargados=false;
    console.log(this.correosNoCargados);
  }

  onCorreosConContrato():void{
    this._clientesServices.getEmailsWithContrato().subscribe((data:string[])=>{
      this.correosList=data;
    });
    this.correosNoCargados=false;
    console.log(this.correosNoCargados);
  }

  onCorreosSinContrato():void{
    this._clientesServices.getEmailsWithOutContrato().subscribe((data:string[])=>{
      this.correosList=data;
    });
    this.correosNoCargados=false;
    console.log(this.correosNoCargados);
  }

  copiarCorreos(){
    const correos = document.querySelectorAll('.correo');
    const correosText = Array.from(correos).map(correo => correo.textContent?.trim()).join('\n');

    navigator.clipboard.writeText(correosText).then(() => {
      alert('Correos copiados al portapapeles.');
    }).catch(err => {
      console.error('Error al copiar el texto: ', err);
    });
  }

}
