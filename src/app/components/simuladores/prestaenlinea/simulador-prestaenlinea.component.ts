// simulador-prestaenlinea.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador-prestaenlinea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador-prestaenlinea.component.html',
  styleUrls: ['./simulador-prestaenlinea.component.css']
})
export class SimuladorPrestaenlineaComponent implements OnInit {
  minAmount = 100000;
  maxAmount = 1000000;
  minDays = 4;
  maxDays = 30;
  
  amount = 1000000;
  days = 30;
  
  disbursementDate: Date = new Date();
  paymentDate: Date = new Date();
  interest = 0;
  fianza = 0;
  subtotal = 0;
  adminFee = 63000;

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    this.paymentDate = new Date();
    this.paymentDate.setDate(this.disbursementDate.getDate() + this.days);
    
    this.interest = Math.round(this.amount * (0.0185 / 30) * this.days);
    this.fianza = Math.round(this.amount * 0.11);
    this.subtotal = this.amount + this.interest + this.fianza;
    
    if (this.amount <= 500000) {
      this.adminFee = 44000;
    } else if (this.amount <= 750000) {
      this.adminFee = 52500;
    } else {
      this.adminFee = 63000;
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  adjustAmount(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.amount = Math.round(parseInt(value) / 10000) * 10000;
    this.calculate();
  }

  updateDays(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.days = parseInt(value);
    this.calculate();
  }
}