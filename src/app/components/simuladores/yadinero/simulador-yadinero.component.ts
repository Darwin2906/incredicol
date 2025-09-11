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

  porcentajeFianza = 0.166;
  administracionFija = 34900; 
  expressCosto = 2600; 
  expressIVAExtra = 494;
  expressActivo = false;

  ngOnInit() {
    this.calcular();
  }

  calcular() {
  this.interes = Math.round(this.monto * 0.000612 * this.plazo);

  const fianzaBase = 19992;
  const incrementoFianza = 1666;
  const pasos = Math.max(0, (this.monto - 120000) / 10000);
  this.fianza = Math.round(fianzaBase + (pasos * incrementoFianza));

  this.administracion = this.administracionFija;

  this.iva = Math.round(this.administracion * 0.19);

  if (this.expressActivo) {
    this.iva += this.expressIVAExtra;
    this.express = this.expressCosto;
  } else {
    this.express = 0;
  }

  this.total = this.monto + this.interes + this.fianza + this.administracion + this.iva + this.express;

  const fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() + this.plazo);
  this.fechaPago = fechaActual.toISOString().split('T')[0];
}



  toggleExpress() {
    this.expressActivo = !this.expressActivo;
    this.calcular();
  }
}
