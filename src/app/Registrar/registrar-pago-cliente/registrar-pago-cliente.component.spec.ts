import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPagoClienteComponent } from './registrar-pago-cliente.component';

describe('RegistrarPagoClienteComponent', () => {
  let component: RegistrarPagoClienteComponent;
  let fixture: ComponentFixture<RegistrarPagoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPagoClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarPagoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
