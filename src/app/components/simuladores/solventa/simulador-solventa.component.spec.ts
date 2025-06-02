import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorSolventaComponent } from './simulador-solventa.component';

describe('SimuladorSolventaComponent', () => {
  let component: SimuladorSolventaComponent;
  let fixture: ComponentFixture<SimuladorSolventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorSolventaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorSolventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
