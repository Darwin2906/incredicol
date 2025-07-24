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

  tasaDiaria: number = 0.0006; // 0.06% diaria como en Excel
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
      this.monto = +params['monto'] || this.monto;
      this.plazo = +params['plazo'] || this.plazo;
      this.calcularPrestamo();
    });
  }

  calcularPrestamo() {
    // Interés simple con tasa diaria fija (como Excel)
    this.interes = Math.round(this.monto * this.tasaDiaria * this.plazo);

    // Seguro proporcional al monto
    this.seguro = Math.round(this.monto * this.tasaSeguro);

    // Fianza según monto (fórmula escalonada si es necesario)
    if (this.monto <= 200000) {
      this.fianza = 30345;
    } else if (this.monto <= 210000) {
      this.fianza = 34986;
    } else {
      this.fianza = Math.round(this.monto * 0.148); // Puedes ajustar este % si hay más rangos
    }

    // IVA sobre administración
    this.iva = Math.round(this.administracion * this.tasaIVA);

    // Descuento si paga en 10 días o menos (solo cargos)
    const cargos = this.seguro + this.fianza + this.administracion;
    if (this.plazo <= 10) {
      this.descuento = Math.round(cargos * 0.5);
    } else {
      this.descuento = 0;
    }

    // Total a pagar (sin aplicar descuento al interés ni monto)
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
