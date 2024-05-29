import { TestBed } from '@angular/core/testing';

import { ApiPagosAliadosService } from './api-pagos-aliados.service';

describe('ApiPagosAliadosService', () => {
  let service: ApiPagosAliadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPagosAliadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
