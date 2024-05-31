import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesDespuesComponent } from './imagenes-despues.component';

describe('ImagenesDespuesComponent', () => {
  let component: ImagenesDespuesComponent;
  let fixture: ComponentFixture<ImagenesDespuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenesDespuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagenesDespuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
