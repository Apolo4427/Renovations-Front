import { TestBed } from '@angular/core/testing';

import { ApisProyectosServicesService } from './apis-proyectos-services.service';

describe('ApisProyectosServicesService', () => {
  let service: ApisProyectosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisProyectosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
