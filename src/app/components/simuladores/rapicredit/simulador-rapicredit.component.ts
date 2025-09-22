import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-rapicredit',
  templateUrl: './simulador-rapicredit.component.html',
  styleUrls: ['./simulador-rapicredit.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RapicreditComponent implements OnInit {
  monto: number = 250000;
  plazo: number = 30;

  // Tasas reales del simulador Rapicredit (según el Excel)
  tasaDiaria: number = 0.00057;  // Interés corriente diario (23% EA)
  valorBaseFirma: number = 136530;

  interes: number = 0;
  aval: number = 0;
  firmaElectronica: number = 0;
  pagoTotal: number = 0;

  opcionesPlazo: number[] = [];

  // Tabla de descuento en firma electrónica por días (según Excel)
  descuentosFirma: Record<number, number> = {
    5: 0.944444, 6: 0.933333, 7: 0.922222, 8: 0.911111, 9: 0.9, 10: 0.888889,
    11: 0.877778, 12: 0.866667, 13: 0.855556, 14: 0.844444, 15: 0.833333,
    16: 0.822222, 17: 0.811111, 18: 0.8, 19: 0.788889, 20: 0.777778,
    21: 0.766667, 22: 0.755556, 23: 0.744444, 24: 0.733333, 25: 0.722222,
    26: 0.711111, 27: 0.7, 28: 0.688889, 29: 0.677778, 30: 0.666667,
    60: 0.333333, 90: 0, 120: 0, 150: 0
  };

  // Tabla de aval por monto = $100.000 (puedes escalar linealmente según monto)
  avalPorPlazo: Record<number, number> = {
    5: 14042, 6: 14161, 7: 14280, 8: 14399, 9: 14518, 10: 14637,
    11: 14756, 12: 14875, 13: 14994, 14: 15113, 15: 15232, 16: 15351,
    17: 15470, 18: 15589, 19: 15708, 20: 15827, 21: 15946, 22: 16065,
    23: 16184, 24: 16303, 25: 16422, 26: 16541, 27: 16660, 28: 16779,
    29: 16898, 30: 17017, 60: 20587, 90: 24157, 120: 24157, 150: 24157
  };

  ngOnInit() {
    this.generarOpcionesPlazo();
    this.calcularPrestamo();
  }

  generarOpcionesPlazo() {
    for (let i = 5; i <= 30; i++) this.opcionesPlazo.push(i);
    [60, 90, 120, 150].forEach(d => this.opcionesPlazo.push(d));
  }

  calcularPrestamo() {
    // Interés corriente
    this.interes = this.monto * this.tasaDiaria * this.plazo;

    // Aval escalado según el monto (tabla es para $100.000)
    const avalBase = this.avalPorPlazo[this.plazo] ?? 0;
    this.aval = (avalBase / 100000) * this.monto;

    // Firma electrónica con descuento
    const descuento = this.descuentosFirma[this.plazo] ?? 0;
    this.firmaElectronica = this.valorBaseFirma * (1 - descuento);

    // Total
    this.pagoTotal = this.monto + this.interes + this.aval + this.firmaElectronica;
  }
}
