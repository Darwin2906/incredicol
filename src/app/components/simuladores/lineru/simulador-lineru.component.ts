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
  tasaFianza: number = 0.12602; 
  administracion: number = 34900;
  iva: number = 6631; 

  interes: number = 0;
  seguro: number = 0;
  fianza: number = 0;
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
    this.fianza = Math.round(this.monto * this.tasaFianza);

    const cargosSeleccionados = this.seguro + this.administracion;
    this.descuento = this.plazo <= 10 ? Math.round(cargosSeleccionados * 0.5) : 0;

    this.totalPagar = this.monto + this.interes + this.seguro + this.fianza + this.administracion + this.iva - this.descuento;
  }

  ngOnInit() {
    this.calcularPrestamo();
  }
}
