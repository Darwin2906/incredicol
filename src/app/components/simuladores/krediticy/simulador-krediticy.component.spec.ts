import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorKrediticyComponent } from './simulador-krediticy.component';

describe('SimuladorKrediticyComponent', () => {
  let component: SimuladorKrediticyComponent;
  let fixture: ComponentFixture<SimuladorKrediticyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorKrediticyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorKrediticyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
