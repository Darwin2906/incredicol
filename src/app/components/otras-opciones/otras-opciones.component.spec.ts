import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrasOpcionesComponent } from './otras-opciones.component';

describe('OtrasOpcionesComponent', () => {
  let component: OtrasOpcionesComponent;
  let fixture: ComponentFixture<OtrasOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrasOpcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrasOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
