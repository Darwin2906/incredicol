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

  // Firma electrónica fija
  firmaElectronica = 89579;

  // Tasa EA y tasa diaria fija solicitada
  tasaEA = 0.2501; // EA única
  tasaDiaria = 0.0006118; // tasa diaria fija proporcionada

  // Estructuras de tabla existentes
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

  // Nuevas salidas para fianza
  lowFianza = 0;
  highFianza = 0;

  // Totales que incluyen fianza y firma
  lowTotalWithExtras = 0;
  highTotalWithExtras = 0;

  // --- Nuevo: interés aproximado como propiedad ---
  interesApprox = 0;

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
  }

  ngOnInit(): void {
    this.calculatePaymentDateOptions();
    this.calculateCosts();

    this.loanForm.valueChanges.subscribe(() => {
      this.calculateCosts();
    });
  }

  calculateCuota(monto: number, cuotas: number, tipo: 'bajo' | 'alto'): number {
    const montoBase = 150000;
    const paso = 50000;
    const steps = Math.max(0, Math.floor((monto - montoBase) / paso));

    const base = this.baseRates[this.selectedDateId][cuotas][tipo];
    const increment = this.increments[this.selectedDateId][cuotas][tipo];

    return Math.round(base + (increment * steps));
  }

  calculatePaymentDateOptions() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.paymentDateOptions = [];

    const adjustToBusinessDay = (date: Date) => {
      if (date.getDay() === 6) date.setDate(date.getDate() + 2);
      else if (date.getDay() === 0) date.setDate(date.getDate() + 1);
      return date;
    };

    const daysUntilDate = (target: Date) => {
      return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };

    let nextMonth15 = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    nextMonth15 = adjustToBusinessDay(nextMonth15);
    let daysUntil15 = daysUntilDate(nextMonth15);

    if (daysUntil15 < 10) {
      nextMonth15 = new Date(today.getFullYear(), today.getMonth() + 2, 15);
      nextMonth15 = adjustToBusinessDay(nextMonth15);
      daysUntil15 = daysUntilDate(nextMonth15);
    }

    const nextMonth = today.getMonth() + 1;
    let lastDay = new Date(today.getFullYear(), nextMonth + 1, 0);

    while (lastDay.getDay() === 0 || lastDay.getDay() === 6) {
      lastDay.setDate(lastDay.getDate() - 1);
    }
    let daysUntilLast = daysUntilDate(lastDay);

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

    // 👇 Sobrescribes los días calculados
this.paymentDateOptions[0].daysUntil = 23;
this.paymentDateOptions[1].daysUntil = 39;

this.daysUntil = this.paymentDateOptions[0].daysUntil;
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

  // --- Nueva versión: fianza según monto y score (siempre aplica) ---
  calculateFianzaForScore(score: 'bajo' | 'alto', monto: number): number {
    const montoBase = 150000;
    const paso = 50000;

    if (monto < montoBase) return 0;

    const pasos = Math.max(0, Math.floor((monto - montoBase) / paso));

    if (score === 'bajo') {
      const base = 19635;   // valor inicial bajo
      const incremento = 6545; // incremento bajo
      return Math.round(base + pasos * incremento);
    } else {
      const base = 6248;    // valor inicial alto
      const incremento = 2082; // incremento alto
      return Math.round(base + pasos * incremento);
    }
  }

  calculateCosts() {
    const amount = this.loanForm.value.amount;
  const installments = this.loanForm.value.installments;

  this.lowCreditCost = this.calculateCuota(amount, installments, 'bajo');
  this.highCreditCost = this.calculateCuota(amount, installments, 'alto');

  this.lowTotalCost = installments === 1 ? this.lowCreditCost : this.lowCreditCost * installments;
  this.highTotalCost = installments === 1 ? this.highCreditCost : this.highCreditCost * installments;

// Interés base con capitalización compuesta (sin factor extra)
const interesBase = amount * (Math.pow(1 + this.tasaEA, this.daysUntil / 365) - 1);
this.interesApprox = Math.round(interesBase);


  // --- Fianzas ---
    this.lowFianza = this.calculateFianzaForScore('bajo', amount);
    this.highFianza = this.calculateFianzaForScore('alto', amount);

    const firma = this.firmaElectronica;

    this.lowTotalWithExtras = amount + this.interesApprox + this.lowFianza + firma;
    this.highTotalWithExtras = amount + this.interesApprox + this.highFianza + firma;
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
    window.open('https://solventa.co/simulador-de-credito', '_blank');
  }
}
