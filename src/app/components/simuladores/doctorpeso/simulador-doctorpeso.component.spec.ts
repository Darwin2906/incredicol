import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorDoctorpesoComponent } from './simulador-doctorpeso.component';

describe('SimuladorDoctorpesoComponent', () => {
  let component: SimuladorDoctorpesoComponent;
  let fixture: ComponentFixture<SimuladorDoctorpesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorDoctorpesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorDoctorpesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
