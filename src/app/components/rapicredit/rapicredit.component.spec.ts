import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapicreditComponent } from './rapicredit.component';

describe('RapicreditComponent', () => {
  let component: RapicreditComponent;
  let fixture: ComponentFixture<RapicreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapicreditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapicreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
