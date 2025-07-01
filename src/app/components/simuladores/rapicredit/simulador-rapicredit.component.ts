import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-rapicredit',
  templateUrl: './simulador-rapicredit.component.html',
  styleUrls: ['./simulador-rapicredit.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RapicreditComponent {
  monto: number = 250000;
  plazo: number = 15;

  // Tasas
  tasaDiaria: number = 0.00063; // Equivale a aproximadamente 23% EA
  tasaAval: number = 0.24157;
  tasaFirma: number = 0.522;

  // Valores calculados
  interes: number = 0;
  aval: number = 0;
  firmaElectronica: number = 0;
  pagoTotal: number = 0;

  calcularPrestamo() {
    this.interes = this.monto * this.tasaDiaria * this.plazo;
    this.aval = this.monto * this.tasaAval;
    this.firmaElectronica = this.monto * this.tasaFirma;
    this.pagoTotal = this.monto + this.interes + this.aval + this.firmaElectronica;
  }

  ngOnInit() {
    this.calcularPrestamo();
  }
}
