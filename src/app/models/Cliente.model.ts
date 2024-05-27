export interface Cliente {
    id:            number;
    nombre:        string;
    direccion:     string;
    contacto:      string;
    email:         string;
    referido_por:  string;
    proyectosList: ProyectosList[];
}

export interface ProyectosList {
    proyectoId:                number;
    numeroContrato:            string;
    fecha_estimado:            null;
    fecha_inicio:              null;
    imagenesAntes:             FacturasDeMarteriale[];
    contratante:               string;
    emailCliente:              string;
    valor_aprovado:            null;
    listaDePagosClientes:      ListaDePagosCliente[];
    fechaDePago_velorAprovado: null;
    documentos:                Documento[];
    facturas_de_marteriales:   FacturasDeMarteriale[];
    listaDePagosAliados:       ListaDePagosAliado[];
    imagenesDespues:           FacturasDeMarteriale[];
}

export interface Documento {
    id:   string;
    name: string;
    data: string;
}

export interface FacturasDeMarteriale {
    id:           string;
    originalName: string;
    fecha?:       string;
    data:         string;
}

export interface ListaDePagosAliado {
    compañiaAliada:   string;
    valorPagado:      string;
    fechaDePago:      string;
    facturasDePagos:  null;
    pagoParaAliadoId: number;
}

export interface ListaDePagosCliente {
    fecha_pago:    string;
    metodo_pago:   null;
    valor_pagado:  string;
    factura:       null;
    pagoClienteId: number;
}
