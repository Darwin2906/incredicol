import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador-rapicredit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador-rapicredit.component.html',
  styleUrls: ['./simulador-rapicredit.component.css']
})
export class SimuladorRapicreditComponent implements OnInit {
  monto: number = 300000;
  plazo: number = 30;
  montoMin: number = 0;
  montoMax: number = 0;
  plazosDisponibles: number[] = [];
  pagoTotal: number = 0;
  interes: number = 0;
  comision: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.montoMin = data['montoMin'];
      this.montoMax = data['montoMax'];
      this.plazosDisponibles = data['plazos'];
    });

    this.route.queryParams.subscribe((params: Params) => {
      const montoParam = +params['monto'];
      const plazoParam = +params['plazo'];

      this.monto = isNaN(montoParam)
        ? this.montoMin
        : Math.min(Math.max(montoParam, this.montoMin), this.montoMax);

      this.plazo = this.plazosDisponibles.includes(plazoParam)
        ? plazoParam
        : this.plazosDisponibles[0];

      this.calcularPrestamo();
    });
  }

  calcularPrestamo() {
    const tasaDiaria = 0.0008; // 0.08% diario
    this.interes = this.monto * tasaDiaria * this.plazo;
    this.comision = this.monto * 0.05;
    this.pagoTotal = this.monto + this.interes + this.comision;
  }

  actualizarSimulacion() {
    this.calcularPrestamo();

  }
}
