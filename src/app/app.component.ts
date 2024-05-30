import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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

  menuOption:string='';

  onOption(option:string){
    this.menuOption = option;
  }

}
