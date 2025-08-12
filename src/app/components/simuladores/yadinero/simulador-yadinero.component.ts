import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador-yadinero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador-yadinero.component.html',
  styleUrls: ['./simulador-yadinero.component.css']
})
export class SimuladorYaDineroComponent {
  monto = 120000;
  plazo = 30;

  minMonto = 120000;
  maxMonto = 2000000; 
  minPlazo = 5;
  maxPlazo = 30;

  fianza = 0;
  administracion = 0;
  interes = 0;
  iva = 0;
  express = 0;
  total = 0;
  fechaPago = '';

  porcentajeFianza = 0.166;   // 16.6% aprox. (incluye IVA)
  administracionFija = 34900; 
  expressCosto = 2600; 
  expressIVAExtra = 494; // IVA adicional si express está activo
  expressActivo = false;

  ngOnInit() {
    this.calcular();
  }

  calcular() {
  // Interés corriente diario simple
  this.interes = Math.round(this.monto * 0.00060671 * this.plazo);

  // Fianza FGA + IVA según progresión de la tabla
  const fianzaBase = 19992;
  const incrementoFianza = 1666;
  const pasos = Math.max(0, (this.monto - 120000) / 10000);
  this.fianza = Math.round(fianzaBase + (pasos * incrementoFianza));

  // Administración fija
  this.administracion = this.administracionFija;

  // IVA base sobre administración
  this.iva = Math.round(this.administracion * 0.19);

  // Si express está activo
  if (this.expressActivo) {
    this.iva += this.expressIVAExtra;
    this.express = this.expressCosto;
  } else {
    this.express = 0;
  }

  // Total a pagar
  this.total = this.monto + this.interes + this.fianza + this.administracion + this.iva + this.express;

  // Fecha de pago
  const fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() + this.plazo - 1);
  this.fechaPago = fechaActual.toISOString().split('T')[0];
}





  toggleExpress() {
    this.expressActivo = !this.expressActivo;
    this.calcular();
  }
}
