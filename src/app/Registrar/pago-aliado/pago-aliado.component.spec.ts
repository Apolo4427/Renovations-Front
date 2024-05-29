import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoAliadoComponent } from './pago-aliado.component';

describe('PagoAliadoComponent', () => {
  let component: PagoAliadoComponent;
  let fixture: ComponentFixture<PagoAliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoAliadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoAliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
