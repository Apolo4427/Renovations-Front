import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { BuscadorClientesComponent } from './Buscadores/buscador-clientes/buscador-clientes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, BuscadorClientesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RenovationsJRL';
  //private _activatedRouter = inject(ActivatedRoute);

  menuOption:string='';

  onOption(option:string){
    this.menuOption = option;
  }

  
}
