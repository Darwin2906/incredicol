import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioWasticreditComponent } from './formulario-wasticredit.component';

describe('FormularioWasticreditComponent', () => {
  let component: FormularioWasticreditComponent;
  let fixture: ComponentFixture<FormularioWasticreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioWasticreditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioWasticreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
