import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectoDetailComponent } from './proyecto-detail/proyecto-detail.component';
import { EditarComponent } from './editar/editar.component';
import { register } from 'module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';

export const routes: Routes = [
    {
        path:'', component: ClienteComponent
    },
    {
        path:'cliente',component: ClienteDetailComponent
    },
    {
        path:'proyectos', component: ProyectoComponent
    },
    {
        path:'proyecto', component: ProyectoDetailComponent
    },
    {
        path:'editar', component: EditarComponent
    },
    {
        path:'registrar', component: RegistrarComponent
    },
    {
        path:'**', redirectTo:'', pathMatch:'full'
    }
];
