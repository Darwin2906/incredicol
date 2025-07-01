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
  cuotas: number = 6;

  fechaPago: string = '';
  diasRestantes: number = 0;

  fechaActual: string = '';
  fechaAlternativa: string = '';

  diasActuales: number = 0;
  diasAlternativos: number = 0;

  fechaActualTexto: string = '';
  fechaAlternativaTexto: string = '';

  pagoAlto: number = 0;
  pagoBajo: number = 0;

  puntajeAnimado: number = 80;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const hoy = new Date();
    const alternativa = new Date(hoy);
    alternativa.setDate(hoy.getDate() + 30);

    this.fechaActual = this.formatFecha(hoy);
    this.fechaAlternativa = this.formatFecha(alternativa);

    this.fechaPago = this.fechaAlternativa;
    this.diasRestantes = this.calcularDias(this.fechaPago);

    this.diasActuales = this.calcularDias(this.fechaActual);
    this.diasAlternativos = this.calcularDias(this.fechaAlternativa);

    this.fechaActualTexto = this.formatTexto(hoy);
    this.fechaAlternativaTexto = this.formatTexto(alternativa);

    this.route.queryParams.subscribe(params => {
      this.monto = +params['monto'] || this.monto;
      this.cuotas = +params['plazo'] || this.cuotas;
      this.actualizarSimulacion();
    });

    this.actualizarSimulacion();
  }

  seleccionarFecha(fecha: string, dias: number) {
    this.fechaPago = fecha;
    this.diasRestantes = dias;
  }

  setCuotas(cuotas: number) {
    this.cuotas = cuotas;
    this.actualizarSimulacion();
  }

  actualizarSimulacion() {
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

  calcularPagos() {
    // Tasas aproximadas basadas en los datos reales
    let tasaBase = 0.22; // base mensual
    if (this.cuotas === 1) tasaBase = 0.28;
    if (this.cuotas === 3) tasaBase = 0.32;
    if (this.cuotas === 6) tasaBase = 0.35;

    // Pago Alto (peor crédito)
    const totalAlto = this.monto * (1 + tasaBase * this.cuotas);
    this.pagoAlto = totalAlto / this.cuotas;

    // Pago Bajo (mejor crédito)
    const tasaMejorCredito = tasaBase * 0.93;
    const totalBajo = this.monto * (1 + tasaMejorCredito * this.cuotas);
    this.pagoBajo = totalBajo / this.cuotas;
  }

  formatFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }

  formatTexto(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    return fecha.toLocaleDateString('es-CO', opciones);
  }

  calcularDias(fechaStr: string): number {
    const hoy = new Date();
    const fecha = new Date(fechaStr);
    const diferencia = fecha.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }

  getPuntajeX(puntaje: number): number {
    return 110 + 90 * Math.cos(Math.PI * (puntaje / 100));
  }

  getPuntajeY(puntaje: number): number {
    return 100 - 90 * Math.sin(Math.PI * (puntaje / 100));
  }
}
