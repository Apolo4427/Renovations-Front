import { TestBed } from '@angular/core/testing';

import { ApiServiceClientesService } from './api-service-clientes.service';

describe('ApiServiceClientesService', () => {
  let service: ApiServiceClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
