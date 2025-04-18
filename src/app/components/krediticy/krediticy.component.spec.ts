import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrediticyComponent } from './krediticy.component';

describe('KrediticyComponent', () => {
  let component: KrediticyComponent;
  let fixture: ComponentFixture<KrediticyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrediticyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KrediticyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
