import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioYadineroComponent } from './formulario-yadinero.component';

describe('FormularioYadineroComponent', () => {
  let component: FormularioYadineroComponent;
  let fixture: ComponentFixture<FormularioYadineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioYadineroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioYadineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
