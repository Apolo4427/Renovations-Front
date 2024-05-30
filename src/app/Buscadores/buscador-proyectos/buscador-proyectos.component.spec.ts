import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorProyectosComponent } from './buscador-proyectos.component';

describe('BuscadorProyectosComponent', () => {
  let component: BuscadorProyectosComponent;
  let fixture: ComponentFixture<BuscadorProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
