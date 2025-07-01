import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-lineru',
  templateUrl: './simulador-lineru.component.html',
  styleUrls: ['./simulador-lineru.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LineruComponent {
  monto: number = 900000;
  plazo: number = 180;

  // Tasas basadas en los ejemplos
  tasaInteresEA: number = 0.30;      // 30% E.A fija
  tasaSeguro: number = 0.0045;       // 0.45%
  tasaAdm: number = 0.0332;          // 3.32%
  tasaFianza: number = 0.0045;       // 0.45%
  tasaIVA: number = 0.0056;          // 0.56%

  interes: number = 0;
  seguro: number = 0;
  administracion: number = 0;
  fianza: number = 0;
  iva: number = 0;

  totalCargos: number = 0;
  descuento: number = 0;
  totalPagar: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.monto = +params['monto'] || this.monto;
      this.plazo = +params['plazo'] || this.plazo;
      this.calcularPrestamo();
    });
  }

  calcularPrestamo() {
    // Convertir EA a tasa diaria compuesta
    const tasaDiaria = Math.pow(1 + this.tasaInteresEA, 1 / 365) - 1;

    this.interes = this.monto * tasaDiaria * this.plazo;
    this.seguro = this.monto * this.tasaSeguro;
    this.administracion = this.monto * this.tasaAdm;
    this.fianza = this.monto * this.tasaFianza;
    this.iva = this.monto * this.tasaIVA;

    const cargosSeleccionados = this.seguro + this.administracion;
    this.descuento = this.plazo <= 10 ? cargosSeleccionados * 0.5 : 0;

    this.totalCargos =
      this.interes + this.seguro + this.administracion + this.fianza + this.iva;

    this.totalPagar = this.monto + this.totalCargos - this.descuento;
  }
}
