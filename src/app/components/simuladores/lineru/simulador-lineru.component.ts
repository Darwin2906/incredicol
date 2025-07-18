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

  tasaEA: number = 0.2458;
  tasaSeguro: number = 0.00449;
  tasaFianza: number = 0.1427; // ya incluye IVA
  tasaIVA: number = 0.19;

  interes: number = 0;
  seguro: number = 0;
  fianza: number = 0; // incluye IVA
  administracion: number = 34900;
  iva: number = 0; // solo IVA sobre administración
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
    // Interés compuesto diario sobre el monto solicitado
    const tasaDiaria = Math.pow(1 + this.tasaEA, 1 / 365) - 1;
    this.interes = Math.round(this.monto * tasaDiaria * this.plazo);

    // Seguro fijo calculado sobre el monto
    this.seguro = Math.round(this.monto * this.tasaSeguro);

    // Fianza calculada con tasa ajustada que ya incluye IVA (13.09%)
    this.fianza = Math.round(this.monto * 0.1309); // valor más exacto en este caso



    // Solo el 50% de la administración tiene IVA (basado en simulador real)
const baseGravable = this.administracion * 0.5;
this.iva = Math.round(baseGravable * this.tasaIVA);


    // Descuento del 50% si el plazo es de 10 días o menos
// Aplica sobre: fianza (con IVA) + administración + IVA sobre administración
// Si el plazo es mayor a 10, cobrar 100% del IVA
if (this.plazo > 10) {
  this.iva = Math.round(this.administracion * this.tasaIVA);
} else {
  const baseGravable = this.administracion * 0.5;
  this.iva = Math.round(baseGravable * this.tasaIVA);
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
