import { TestBed } from '@angular/core/testing';

import { ApiPagosClienteServicesService } from './api-pagos-cliente-services.service';

describe('ApiPagosClienteServicesService', () => {
  let service: ApiPagosClienteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPagosClienteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
