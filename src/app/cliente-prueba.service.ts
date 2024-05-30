import { Injectable } from '@angular/core';
import { Cliente, ProyectosList } from './models/Cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private cliente: Cliente = {
    id: 1,
    nombre: 'Juan Pérez',
    direccion: 'Calle Falsa 123',
    contacto: '123-456-7890',
    email: 'juan.perez@example.com',
    referido_por: 'Maria López',
    proyectosList: [
      {
        proyectoId: 101,
        numeroContrato: 'C-2023-001',
        fecha_estimado: '2023-12-01',
        fecha_inicio: '2023-01-15',
        imagenesAntes: [
          { id: '1', originalName: 'antes1.jpg', data: 'base64ImageData1' }
        ],
        contratante: 'Empresa Contratante SA',
        emailCliente: 'empresa@example.com',
        valor_aprovado: '100000',
        listaDePagosClientes: [
          {
            fecha_pago: '2023-02-01',
            metodo_pago: 'Transferencia',
            valor_pagado: '50000',
            pagoClienteId: 201
          }
        ],
        fechaDePago_velorAprovado: '2023-03-01',
        documentos: [
          { id: 'doc1', name: 'Contrato.pdf', data: 'base64PdfData' }
        ],
        facturas_de_marteriales: [
          { id: 'fact1', originalName: 'factura1.pdf', data: 'base64PdfData' }
        ],
        listaDePagosAliados: [
          {
            empresaAliada: 'Aliados SA',
            valorPagado: '30000',
            fechaDePago: '2023-04-01',
            pagoParaAliadoId: 301
          }
        ],
        imagenesDespues: [
          { id: '2', originalName: 'despues1.jpg', data: 'base64ImageData2' }
        ]
      }
    ]
  };

  getCliente(): Cliente {
    return this.cliente;
  }

  getProyecto():ProyectosList[]{
    return this.cliente.proyectosList;
  }
}

