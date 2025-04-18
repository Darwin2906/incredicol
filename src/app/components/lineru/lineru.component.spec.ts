import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineruComponent } from './lineru.component';

describe('LineruComponent', () => {
  let component: LineruComponent;
  let fixture: ComponentFixture<LineruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineruComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
