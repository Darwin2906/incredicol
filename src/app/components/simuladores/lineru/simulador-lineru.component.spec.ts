import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorLineruComponent } from './simulador-lineru.component';

describe('SimuladorLineruComponent', () => {
  let component: SimuladorLineruComponent;
  let fixture: ComponentFixture<SimuladorLineruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorLineruComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorLineruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
