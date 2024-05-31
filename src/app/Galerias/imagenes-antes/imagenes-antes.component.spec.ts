import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesAntesComponent } from './imagenes-antes.component';

describe('ImagenesAntesComponent', () => {
  let component: ImagenesAntesComponent;
  let fixture: ComponentFixture<ImagenesAntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenesAntesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagenesAntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
