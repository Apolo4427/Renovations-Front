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
    fecha_estimado:            string;
    fecha_inicio:              string;
    imagenesAntes:             FacturasDeMarteriale[];
    contratante:               string;
    emailCliente:              string;
    valor_aprovado:            string;
    listaDePagosClientes:      ListaDePagosCliente[];
    fechaDePago_velorAprovado: string;
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
    empresaAliada:   string;
    valorPagado:      string;
    fechaDePago:      string;
    //facturasDePagos:  string;
    pagoParaAliadoId: number;
}

export interface ListaDePagosCliente {
    fecha_pago:    string;
    metodo_pago:   string;
    valor_pagado:  string;
    //factura:       string;
    pagoClienteId: number;
}
