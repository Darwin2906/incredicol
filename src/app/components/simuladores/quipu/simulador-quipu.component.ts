// simulador-quipu.component.ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Factores de interés por plazo
const INTEREST_FACTORS: { [key: number]: number } = {
  7: 0.212098,
  8: 0.240083,
  9: 0.268393,
  10: 0.297027,
  11: 0.325986,
  12: 0.355266
};

@Component({
  selector: 'app-simulador-quipu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador-quipu.component.html',
  styleUrls: ['./simulador-quipu.component.css']
})
export class SimuladorQuipuComponent {
  // Señales reactivas
  loanAmount = signal(1000000);
  
  // Constantes
  readonly MIN_AMOUNT = 500000;
  readonly MAX_AMOUNT = 1000000;
  readonly STEP_AMOUNT = 10000;
  readonly FIRMA_DIGITAL = 41650;
  readonly FIANZA_PERCENT = 0.2975; // 29.75%

  // Determinar el plazo automáticamente según el monto
  loanTerm = computed(() => {
    const amount = this.loanAmount();
    
    if (amount >= 500000 && amount <= 590000) return 7;
    if (amount >= 600000 && amount <= 690000) return 8;
    if (amount >= 700000 && amount <= 790000) return 9;
    if (amount >= 800000 && amount <= 890000) return 10;
    if (amount >= 900000 && amount <= 990000) return 11;
    if (amount === 1000000) return 12;
    
    // Valor por defecto si no coincide con los rangos
    return 12;
  });

  // Cálculos basados en fórmulas
  pagoInteres = computed(() => {
    const term = this.loanTerm();
    const factor = INTEREST_FACTORS[term];
    return Math.round(this.loanAmount() * factor);
  });

  fianza = computed(() => {
    return Math.round(this.loanAmount() * this.FIANZA_PERCENT);
  });

  totalPagar = computed(() => {
    return this.loanAmount() + this.pagoInteres() + this.fianza() + this.FIRMA_DIGITAL;
  });

  cuotaMensual = computed(() => {
    return Math.round(this.totalPagar() / this.loanTerm());
  });

  constructor(private router: Router) {}

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  requestLoan(): void {
    window.open('https://quipu.com.co/#simulador')
  }

  updateLoanAmount(value: number): void {
    // Asegurar múltiplos de 10,000 y dentro de rango
    const adjusted = Math.round(value / this.STEP_AMOUNT) * this.STEP_AMOUNT;
    const clamped = Math.max(this.MIN_AMOUNT, Math.min(this.MAX_AMOUNT, adjusted));
    this.loanAmount.set(clamped);
  }
}