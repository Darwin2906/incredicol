import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSolventaComponent } from './formulario-solventa.component';

describe('FormularioSolventaComponent', () => {
  let component: FormularioSolventaComponent;
  let fixture: ComponentFixture<FormularioSolventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioSolventaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioSolventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
