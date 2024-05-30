import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectoDetailComponent } from './proyecto-detail/proyecto-detail.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { PagoAliadoComponent } from './Registrar/pago-aliado/pago-aliado.component';
import { RegistrarPagoClienteComponent } from './Registrar/registrar-pago-cliente/registrar-pago-cliente.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { CorreosComponent } from './correos/correos.component';
import { HomeComponent } from './home/home.component';
import { RegistrarClienteComponent } from './Registrar/registrar-cliente/registrar-cliente.component';

export const routes: Routes = [
    {
        path:'', component: HomeComponent
    },
    {
        path:'cliente', component: ClienteComponent
    },
    {
        path:'cliente/:clienteId',component: ClienteDetailComponent
    },
    {
        path:'proyectos', component: ProyectoComponent
    },
    {
        path:'proyecto/:proyectoId', component: ProyectoDetailComponent
    },
    {
        path:'documentos/:proyectoId', component: DocumentosComponent
    },
    {
        path:'registrarCliente', component: RegistrarClienteComponent
    },
    // {
    //     editar cliente y proyecto
    //     registrar cliente,documento y proyecto 
    // },
    {
        path:'nuevoPagoAliado/:proyectoId', component: PagoAliadoComponent
    },
    {
        path:'nuevoPagoCliente/:proyectoId', component: RegistrarPagoClienteComponent
    },
    {
        path:'nuevoDocumento/:proyectoId', component: DocumentosComponent
    },
    {
        path:'correos', component:CorreosComponent  
    },
    {
        path:'**', redirectTo:'', pathMatch:'full'
    }
];
