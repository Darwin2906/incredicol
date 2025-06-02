import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorWasticreditComponent } from './simulador-wasticredit.component';

describe('SimuladorWasticreditComponent', () => {
  let component: SimuladorWasticreditComponent;
  let fixture: ComponentFixture<SimuladorWasticreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorWasticreditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorWasticreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
