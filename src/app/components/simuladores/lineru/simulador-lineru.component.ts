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
  monto: number = 300000;
  plazo: number = 30;

  tasaEA: number = 0.2458; // 24.58% EA
  tasaSeguro: number = 0.00449;
  tasaIVA: number = 0.19;

  interes: number = 0;
  seguro: number = 0;
  fianza: number = 0;
  administracion: number = 34900;
  iva: number = 0;
  descuento: number = 0;
  totalPagar: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['monto']) {
  const nuevoMonto = +params['monto'];
  if (nuevoMonto >= 150000 && nuevoMonto <= 1200000) {
    this.monto = nuevoMonto;
  }
}

      this.plazo = +params['plazo'] || this.plazo;
      this.calcularPrestamo();
    });
  }

  calcularPrestamo() {
    // Interés compuesto diario
    const tasaDiaria = Math.pow(1 + this.tasaEA, 1 / 365) - 1;
    this.interes = Math.round(this.monto * (Math.pow(1 + tasaDiaria, this.plazo) - 1));

    // Seguro
    this.seguro = Math.round(this.monto * this.tasaSeguro);

    // Fianza escalonada
    this.fianza = this.plazo <= 10
      ? Math.round(this.monto * 0.1427) // Plazos cortos, mayor tasa
      : Math.round(this.monto * 0.126); // Plazos más largos, menor tasa

    // IVA solo sobre administración
    this.iva = Math.round(this.administracion * this.tasaIVA);

    // Descuento si paga en 10 días o menos (no aplica al interés)
    if (this.plazo <= 10) {
      const cargosConDescuento = this.seguro + this.fianza + this.administracion + this.interes + this.iva;
      this.descuento = Math.round(cargosConDescuento * 0.5);
    } else {
      this.descuento = 0;
    }

    // Total a pagar
    this.totalPagar = Math.round(
      this.monto +
      this.interes +
      this.seguro +
      this.fianza +
      this.administracion +
      this.iva -
      this.descuento
    );
  }

  ngOnInit() {
    this.calcularPrestamo();
  }
}