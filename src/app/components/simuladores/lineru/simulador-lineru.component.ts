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
  fianza: number = 0;
  administracion: number = 34900;
  iva: number = 0;
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
    const tasaDiaria = Math.pow(1 + this.tasaEA, 1 / 365) - 1;
    this.interes = Math.round(this.monto * tasaDiaria * this.plazo);

    this.seguro = Math.round(this.monto * this.tasaSeguro);

    this.fianza = Math.round(this.monto * 0.1309); // ya con IVA

    // IVA sobre el 50% de administración si plazo <= 10, si no se cobra 100%
    const baseGravableIVA = this.plazo > 10 ? this.administracion : this.administracion * 0.5;
    this.iva = Math.round(baseGravableIVA * this.tasaIVA);

    // Calcular descuento si plazo <= 10 días
    if (this.plazo <= 10) {
      const cargosDescontables = this.interes + this.seguro + this.fianza + this.administracion;
      this.descuento = Math.round(cargosDescontables * 0.5); // 50% de esos cargos
    } else {
      this.descuento = 0;
    }

    // Total a pagar con descuento aplicado
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
