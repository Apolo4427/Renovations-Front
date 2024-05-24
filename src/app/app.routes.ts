import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';

export const routes: Routes = [
    {
        path:'', component: ClienteComponent
    },
    {
        path:'**', redirectTo:'', pathMatch:'full'
    }
];
