import { TestBed } from '@angular/core/testing';

import { ClientePruebaService } from './cliente-prueba.service';

describe('ClientePruebaService', () => {
  let service: ClientePruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientePruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
