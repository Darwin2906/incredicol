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

  tasaEA: number = 0.2507; // 25.01% EA
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
    { monto: 510000, fianza: 64271 },
    { monto: 520000, fianza: 65531 },
    { monto: 530000, fianza: 66791 },
    { monto: 540000, fianza: 68051 },
    { monto: 550000, fianza: 69312 },
    { monto: 560000, fianza: 70572 },
    { monto: 570000, fianza: 71832 },
    { monto: 580000, fianza: 73092 },
    { monto: 590000, fianza: 74352 },
    { monto: 600000, fianza: 75613 },
    { monto: 610000, fianza: 76873 },
    { monto: 620000, fianza: 78133 },
    { monto: 630000, fianza: 79393 },
    { monto: 640000, fianza: 80653 },
    { monto: 650000, fianza: 81914 },
    { monto: 660000, fianza: 83174 },
    { monto: 670000, fianza: 84434 },
    { monto: 680000, fianza: 85694 },
    { monto: 690000, fianza: 86954 },
    { monto: 700000, fianza: 88215 },
    { monto: 710000, fianza: 89475 },
    { monto: 720000, fianza: 90735 },
    { monto: 730000, fianza: 91995 },
    { monto: 740000, fianza: 93256 },
    { monto: 750000, fianza: 94516 },
    { monto: 760000, fianza: 95776 },
    { monto: 770000, fianza: 97036 },
    { monto: 780000, fianza: 98296 },
    { monto: 790000, fianza: 99557 },
    { monto: 800000, fianza: 100817 },
    { monto: 810000, fianza: 102077 },
    { monto: 820000, fianza: 103337 },
    { monto: 830000, fianza: 104597 },
    { monto: 840000, fianza: 105858 },
    { monto: 850000, fianza: 107118 },
    { monto: 860000, fianza: 108378 },
    { monto: 870000, fianza: 109638 },
    { monto: 880000, fianza: 110898 },
    { monto: 890000, fianza: 112159 },
    { monto: 900000, fianza: 113419 },
    { monto: 910000, fianza: 114679 },
    { monto: 920000, fianza: 115939 },
    { monto: 930000, fianza: 117200 },
    { monto: 940000, fianza: 118460 },
    { monto: 950000, fianza: 119720 },
    { monto: 960000, fianza: 120980 },
    { monto: 970000, fianza: 122240 },
    { monto: 980000, fianza: 123501 },
    { monto: 990000, fianza: 124761 },
    { monto: 1000000, fianza: 126021 },
    { monto: 1010000, fianza: 127281 },
    { monto: 1020000, fianza: 128541 },
    { monto: 1030000, fianza: 129802 },
    { monto: 1040000, fianza: 131062 },
    { monto: 1050000, fianza: 132322 },
    { monto: 1060000, fianza: 133582 },
    { monto: 1070000, fianza: 134842 },
    { monto: 1080000, fianza: 136103 },
    { monto: 1090000, fianza: 137363 },
    { monto: 1100000, fianza: 138623 },
    { monto: 1110000, fianza: 139883 },
    { monto: 1120000, fianza: 141144 },
    { monto: 1130000, fianza: 142404 },
    { monto: 1140000, fianza: 143664 },
    { monto: 1150000, fianza: 144924 },
    { monto: 1160000, fianza: 146184 },
    { monto: 1170000, fianza: 147445 },
    { monto: 1180000, fianza: 148705 },
    { monto: 1190000, fianza: 149965 },
    { monto: 1200000, fianza: 151225 },
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
