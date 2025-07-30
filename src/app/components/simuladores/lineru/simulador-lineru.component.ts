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

  fianzaTable: { monto: number, fianza: number }[] = [
    { monto: 150000, fianza: 30345 },
    { monto: 160000, fianza: 32368 },
    { monto: 170000, fianza: 34391 },
    { monto: 180000, fianza: 36414 },
    { monto: 190000, fianza: 38437 },
    { monto: 200000, fianza: 33320 },
    { monto: 210000, fianza: 34986 },
    { monto: 220000, fianza: 36653 },
    { monto: 230000, fianza: 38319 },
    { monto: 240000, fianza: 39986 },
    { monto: 250000, fianza: 41652 },
    { monto: 260000, fianza: 43318 },
    { monto: 270000, fianza: 44985 },
    { monto: 280000, fianza: 46651 },
    { monto: 290000, fianza: 48318 },
    { monto: 300000, fianza: 42840 },
    { monto: 310000, fianza: 44268 },
    { monto: 320000, fianza: 45696 },
    { monto: 330000, fianza: 47124 },
    { monto: 340000, fianza: 48552 },
    { monto: 350000, fianza: 49980 },
    { monto: 360000, fianza: 51408 },
    { monto: 370000, fianza: 52836 },
    { monto: 380000, fianza: 54264 },
    { monto: 390000, fianza: 55692 },
    { monto: 400000, fianza: 52360 },
    { monto: 410000, fianza: 53669 },
    { monto: 420000, fianza: 54978 },
    { monto: 430000, fianza: 56287 },
    { monto: 440000, fianza: 57596 },
    { monto: 450000, fianza: 58905 },
    { monto: 460000, fianza: 60214 },
    { monto: 470000, fianza: 61523 },
    { monto: 480000, fianza: 62832 },
    { monto: 490000, fianza: 64141 },
    { monto: 500000, fianza: 63011 },

  ];

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

  getFianzaPorMonto(monto: number): number {
    const exacto = this.fianzaTable.find(item => item.monto === monto);
    if (exacto) return exacto.fianza;

    // Buscar el más cercano menor
    const menores = this.fianzaTable.filter(item => item.monto < monto);
    if (menores.length > 0) {
      const masCercano = menores.reduce((prev, curr) =>
        curr.monto > prev.monto ? curr : prev
      );
      return masCercano.fianza;
    }

    return 0; // Valor por defecto
  }

  calcularPrestamo() {
    // Interés compuesto diario
    const tasaDiaria = Math.pow(1 + this.tasaEA, 1 / 365) - 1;
    this.interes = Math.round(this.monto * (Math.pow(1 + tasaDiaria, this.plazo) - 1));

    // Seguro
    this.seguro = Math.round(this.monto * this.tasaSeguro);

    // Fianza exacta desde tabla
    this.fianza = this.getFianzaPorMonto(this.monto);

    // IVA solo sobre administración
    this.iva = Math.round(this.administracion * this.tasaIVA);

    // Descuento si paga en 10 días o menos (sobre todos los cargos excepto monto)
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
