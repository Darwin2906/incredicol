import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-simulador-solventa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './simulador-solventa.component.html',
  styleUrls: ['./simulador-solventa.component.scss'],
  providers: [CurrencyPipe, DatePipe]
})
export class SimuladorSolventaComponent implements OnInit {
  loanForm: FormGroup;
  minAmount = 150000;
  maxAmount = 5000000;
  stepAmount = 50000;
  installments = [1, 3, 6];
  paymentDateOptions: any[] = [];
  lowCreditCost = 0;
  highCreditCost = 0;
  lowTotalCost = 0;
  highTotalCost = 0;
  today = new Date();
  selectedDateId: string = 'option1';
  showTotal = true;
  daysUntil = 0;
  firmaElectronica = 89579;
  tasasEA = {
    'option1': 0.2555, // 25.55% 
    'option2': 0.2478  // 24.78% 
  };
  tasasDiarias: { [key: string]: number } = {};

  // Datos exactos de las tablas
  baseRates: any = {
    'option1': {
      1: { bajo: 260884, alto: 247497 },
      3: { bajo: 88894, alto: 84431 },
      6: { bajo: 45940, alto: 43709 }
    },
    'option2': {
      1: { bajo: 262195, alto: 248808 },
      3: { bajo: 89315, alto: 84853 },
      6: { bajo: 46163, alto: 43932 }
    }
  };

  increments: any = {
    'option1': {
      1: { bajo: 57101, alto: 52638 },
      3: { bajo: 19678, alto: 18191 },
      6: { bajo: 10337, alto: 9593 }
    },
    'option2': {
      1: { bajo: 57539, alto: 53076 },
      3: { bajo: 19818, alto: 18330 },
      6: { bajo: 10411, alto: 9667 }
    }
  };

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {
    this.loanForm = this.fb.group({
      amount: [500000, [
        Validators.required,
        Validators.min(this.minAmount),
        Validators.max(this.maxAmount)
      ]],
      installments: [1, Validators.required]
    });

    this.calculateDailyRates();
  }

  ngOnInit(): void {
    this.calculatePaymentDateOptions();
    this.calculateCosts();
    
    this.loanForm.valueChanges.subscribe(() => {
      this.calculateCosts();
    });
  }

  private calculateDailyRates() {
    this.tasasDiarias['option1'] = Math.pow(1 + this.tasasEA['option1'], 1/365) - 1;
    this.tasasDiarias['option2'] = Math.pow(1 + this.tasasEA['option2'], 1/365) - 1;
  }

  calculateCuota(monto: number, cuotas: number, tipo: 'bajo' | 'alto'): number {
    const montoBase = 150000;
    const paso = 50000;
    const steps = Math.max(0, (monto - montoBase) / paso);
    
    const base = this.baseRates[this.selectedDateId][cuotas][tipo];
    const increment = this.increments[this.selectedDateId][cuotas][tipo];
    
    return base + (increment * steps);
  }

  calculatePaymentDateOptions() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.paymentDateOptions = [];
    
    // Función para ajustar a día hábil
    const adjustToBusinessDay = (date: Date) => {
      // Si es sábado, mover a lunes (día + 2)
      if (date.getDay() === 6) {
        date.setDate(date.getDate() + 2);
      }
      // Si es domingo, mover a lunes (día + 1)
      else if (date.getDay() === 0) {
        date.setDate(date.getDate() + 1);
      }
      return date;
    };

    // Función para calcular días hasta fecha
    const daysUntilDate = (target: Date) => {
      return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };

    // Opción 1: 15 del mes
    let nextMonth15 = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    nextMonth15 = adjustToBusinessDay(nextMonth15);
    let daysUntil15 = daysUntilDate(nextMonth15);

    // Si faltan menos de 10 días, mostrar 15 del siguiente mes
    if (daysUntil15 < 10) {
      nextMonth15 = new Date(today.getFullYear(), today.getMonth() + 2, 15);
      nextMonth15 = adjustToBusinessDay(nextMonth15);
      daysUntil15 = daysUntilDate(nextMonth15);
    }

    // Opción 2: Último día hábil del mes
    const nextMonth = today.getMonth() + 1;
    let lastDay = new Date(today.getFullYear(), nextMonth + 1, 0); // Último día del mes
    
    // Ajustar a día hábil (retroceder si es fin de semana)
    while (lastDay.getDay() === 0 || lastDay.getDay() === 6) {
      lastDay.setDate(lastDay.getDate() - 1);
    }
    
    let daysUntilLast = daysUntilDate(lastDay);
    
    // Si faltan menos de 10 días, mostrar último día del siguiente mes
    if (daysUntilLast < 10) {
      const nextNextMonth = today.getMonth() + 2;
      lastDay = new Date(today.getFullYear(), nextNextMonth + 1, 0);
      while (lastDay.getDay() === 0 || lastDay.getDay() === 6) {
        lastDay.setDate(lastDay.getDate() - 1);
      }
      daysUntilLast = daysUntilDate(lastDay);
    }

    this.paymentDateOptions = [
      { 
        id: 'option1', 
        date: nextMonth15, 
        daysUntil: daysUntil15,
        dayName: this.getDayName(nextMonth15),
        formattedDate: this.datePipe.transform(nextMonth15, 'dd/MM/yyyy')
      },
      { 
        id: 'option2', 
        date: lastDay, 
        daysUntil: daysUntilLast,
        dayName: this.getDayName(lastDay),
        formattedDate: this.datePipe.transform(lastDay, 'dd/MM/yyyy')
      }
    ];

    // Actualizar días hasta el pago para el cálculo
    this.daysUntil = this.paymentDateOptions[0].daysUntil;
  }

  selectDateOption(id: string) {
    this.selectedDateId = id;
    const option = this.paymentDateOptions.find(opt => opt.id === id);
    if (option) {
      this.daysUntil = option.daysUntil;
      this.calculateCosts();
    }
  }

  calculateCosts() {
    const amount = this.loanForm.value.amount;
    const installments = this.loanForm.value.installments;
    
    this.lowCreditCost = this.calculateCuota(amount, installments, 'bajo');
    this.highCreditCost = this.calculateCuota(amount, installments, 'alto');
    
    this.lowTotalCost = installments === 1 ? this.lowCreditCost : this.lowCreditCost * installments;
    this.highTotalCost = installments === 1 ? this.highCreditCost : this.highCreditCost * installments;
    
    this.showTotal = installments === 1;
  }

  getDayName(date: Date): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'COP', 'symbol', '1.0-0')?.replace('COP', '$') || '';
  }

  submitLoan() {
    window.location.href = 'https://solventa.co/simulador-de-credito';
  }
}