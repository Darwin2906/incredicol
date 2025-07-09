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
  plazoDias: 23 | 39 = 23;

  pagoAlto: number = 0;
  pagoBajo: number = 0;
  puntajeAnimado: number = 100;

  fecha23Texto: string = '';
  fecha39Texto: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const hoy = new Date();

    const fecha23 = new Date(hoy);
    fecha23.setDate(hoy.getDate() + 23);
    this.fecha23Texto = this.formatearFecha(fecha23);

    const fecha39 = new Date(hoy);
    fecha39.setDate(hoy.getDate() + 39);
    this.fecha39Texto = this.formatearFecha(fecha39);

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

  seleccionarFecha(plazo: 23 | 39): void {
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

  calcularTasaAlto(monto: number, cuotas: number): number {
    if (cuotas === 1) {
      if (monto <= 500000) return 0.3243;
      if (monto <= 1000000) return 0.2347;
      if (monto <= 2000000) return 0.1899;
      return 0.15;
    }
    if (cuotas === 3) return 0.1381;
    if (cuotas === 6) return 0.0555;
    return 0.2;
  }

  calcularTasaBajo(monto: number, cuotas: number): number {
    if (cuotas === 1) {
      if (monto <= 500000) return 0.2350;
      if (monto <= 1000000) return 0.1455;
      if (monto <= 2000000) return 0.1007;
      return 0.09;
    }
    if (cuotas === 3) return 0.1251;
    if (cuotas === 6) return 0.0454;
    return 0.1;
  }

  calcularPagos(): void {
    const tasaAlto = this.calcularTasaAlto(this.monto, this.cuotas);
    const tasaBajo = this.calcularTasaBajo(this.monto, this.cuotas);

    const totalAlto = this.monto * (1 + tasaAlto * this.cuotas);
    const totalBajo = this.monto * (1 + tasaBajo * this.cuotas);

    const factorPlazo = this.plazoDias === 39 ? 1.018 : 1;

    this.pagoAlto = Math.round((totalAlto * factorPlazo) / this.cuotas);
    this.pagoBajo = Math.round((totalBajo * factorPlazo) / this.cuotas);
  }

  getPuntajeX(puntaje: number): number {
    return 110 + 90 * Math.cos(Math.PI * (puntaje / 100));
  }

  getPuntajeY(puntaje: number): number {
    return 100 - 90 * Math.sin(Math.PI * (puntaje / 100));
  }
}
