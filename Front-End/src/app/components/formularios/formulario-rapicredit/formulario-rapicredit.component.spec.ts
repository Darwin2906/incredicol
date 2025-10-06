import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRapicreditComponent } from './formulario-rapicredit.component';

describe('FormularioRapicreditComponent', () => {
  let component: FormularioRapicreditComponent;
  let fixture: ComponentFixture<FormularioRapicreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRapicreditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRapicreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
