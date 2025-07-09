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
  plazo: number = 30;

  // Tasas ajustadas según simulador oficial
  tasaDiaria: number = 0.00058;       // Interés corriente (aprox. 23% EA)
  tasaAval: number = 0.17017;         // Aval (~17.02%)
  tasaFirma: number = 0.174;          // Firma electrónica (~17.4%)

  interes: number = 0;
  aval: number = 0;
  firmaElectronica: number = 0;
  pagoTotal: number = 0;

  opcionesPlazo: number[] = [];

  ngOnInit() {
    this.generarOpcionesPlazo();
    this.calcularPrestamo();
  }

  generarOpcionesPlazo() {
    for (let i = 5; i <= 30; i++) {
      this.opcionesPlazo.push(i);
    }
    for (let i = 60; i <= 150; i += 30) {
      this.opcionesPlazo.push(i);
    }
  }

  calcularPrestamo() {
    this.interes = this.monto * this.tasaDiaria * this.plazo;
    this.aval = this.monto * this.tasaAval;
    this.firmaElectronica = this.monto * this.tasaFirma;
    this.pagoTotal = this.monto + this.interes + this.aval + this.firmaElectronica;
  }
}
