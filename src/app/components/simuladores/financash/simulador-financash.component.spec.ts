import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancashComponent } from './simulador-financash.component';

describe('FinancashComponent', () => {
  let component: FinancashComponent;
  let fixture: ComponentFixture<FinancashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
