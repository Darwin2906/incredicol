import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solventa',
  standalone: true,
  templateUrl: './simulador-solventa.component.html',
  styleUrls: ['./simulador-solventa.component.css'],
  imports: [CommonModule, FormsModule],
})
export class SolventaComponent implements OnInit {
  monto: number = 750000;
  cuotas: 1 | 3 | 6 = 1;
  plazoDias: 22 | 38 = 22;

  pagoAlto: number = 0;
  pagoBajo: number = 0;
  puntajeAnimado: number = 100;

  fecha22Texto: string = '';
  fecha38Texto: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const hoy = new Date();

    const fecha22 = new Date(hoy);
    fecha22.setDate(hoy.getDate() + 22);
    this.fecha22Texto = this.formatearFecha(fecha22);

    const fecha38 = new Date(hoy);
    fecha38.setDate(hoy.getDate() + 38);
    this.fecha38Texto = this.formatearFecha(fecha38);

    this.route.queryParams.subscribe((params) => {
      this.monto = +params['monto'] || this.monto;
      this.cuotas = (+params['plazo'] as 1 | 3 | 6) || this.cuotas;
      this.actualizarSimulacion();
    });

    this.actualizarSimulacion();
  }

  formatearFecha(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return fecha.toLocaleDateString('es-CO', opciones);
  }

  seleccionarFecha(plazo: 22 | 38): void {
    this.plazoDias = plazo;
    this.actualizarSimulacion();
  }

  setCuotas(c: 1 | 3 | 6): void {
    this.cuotas = c;
    this.actualizarSimulacion();
  }

  actualizarSimulacion(): void {
    this.puntajeAnimado = this.calcularPuntaje();
    this.calcularPagos();
  }

  calcularPuntaje(): number {
    let puntaje = 100;
    if (this.monto <= 500000) puntaje -= 15;
    else if (this.monto <= 1000000) puntaje -= 10;
    else if (this.monto >= 3000000) puntaje -= 20;

    if (this.cuotas === 3) puntaje -= 10;
    else if (this.cuotas === 6) puntaje -= 20;

    return Math.max(0, Math.min(100, puntaje));
  }

  calcularPagos(): void {
    const pagoAlto = this.calcularCuota(this.monto, this.cuotas, this.plazoDias, 'alto');
    const pagoBajo = this.calcularCuota(this.monto, this.cuotas, this.plazoDias, 'bajo');

    this.pagoAlto = Math.round(pagoAlto * this.cuotas);
    this.pagoBajo = Math.round(pagoBajo * this.cuotas);
  }

  calcularCuota(monto: number, cuotas: number, dias: number, tipo: 'alto' | 'bajo'): number {
    const tasaEfectivaAnual = tipo === 'alto' ? 0.73 : 0.61; // TEA real del Excel Solventa
    const tasaDiaria = Math.pow(1 + tasaEfectivaAnual, 1 / 365) - 1;

    const montoFinal = monto * Math.pow(1 + tasaDiaria, dias);
    const cuota = montoFinal / cuotas;

    return Math.round(cuota);
  }

  getPuntajeX(puntaje: number): number {
    return 110 + 90 * Math.cos(Math.PI * (puntaje / 100));
  }

  getPuntajeY(puntaje: number): number {
    return 100 - 90 * Math.sin(Math.PI * (puntaje / 100));
  }
}
