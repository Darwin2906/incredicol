import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorPrestaenlineaComponent } from './simulador-prestaenlinea.component';

describe('SimuladorPrestaenlineaComponent', () => {
  let component: SimuladorPrestaenlineaComponent;
  let fixture: ComponentFixture<SimuladorPrestaenlineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorPrestaenlineaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorPrestaenlineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
