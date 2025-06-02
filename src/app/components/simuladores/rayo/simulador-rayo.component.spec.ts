import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorRayoComponent } from './simulador-rayo.component';

describe('SimuladorRayoComponent', () => {
  let component: SimuladorRayoComponent;
  let fixture: ComponentFixture<SimuladorRayoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorRayoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorRayoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
