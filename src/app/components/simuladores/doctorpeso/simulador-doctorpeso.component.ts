import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctorpeso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador-doctorpeso.component.html',
  styleUrls: ['./simulador-doctorpeso.component.css']
})
export class SimuladorDoctorpesoComponent {
  monto = 490000;
  interesEA = 0.241;
  diasPlazo = 11;

  fianzaIncluida = true;
  firmaIncluida = true;

  fechaSeleccionada: string = this.generarFechaPorDefecto();

  // Firma electrónica basada en rangos para simular mejor el valor original
  get firma(): number {
  if (!this.firmaIncluida) return 0;
  if (this.diasPlazo < 10 || this.diasPlazo > 30) return 0;
  return 14670 + (this.diasPlazo - 10) * 1170;
}


  // Fianza: ajustada al 13.9% del monto
  get fianza(): number {
    return this.fianzaIncluida ? Math.round(this.monto * 0.1354) : 0;
  }

  // Interés: tasa diaria ajustada para acercarse a valores reales
  get interes(): number {
    const tasaDiaria = 0.000602;
    return Math.round(this.monto * tasaDiaria * this.diasPlazo);
  }

  // IVA: sobre firma + interés + 60% de fianza (solo si está activa)
  get iva(): number {
    const fianzaBase = this.fianzaIncluida ? this.fianza * 0.6 : 0;
    const base = this.interes + this.firma + fianzaBase;
    return Math.round(base * 0.19);
  }

  // Total a pagar
  get total(): number {
    return Math.round(this.monto + this.interes + this.fianza + this.firma + this.iva);
  }

  // Formato legible de la fecha
  get fechaPagoTexto(): string {
    const fecha = new Date(this.fechaSeleccionada);
    return fecha.toLocaleDateString('es-CO');
  }

  // Cambiar monto desde botones +/- con límites
  cambiarMonto(valor: number): void {
    const nuevo = this.monto + valor;
    if (nuevo >= 100000 && nuevo <= 1100000) {
      this.monto = nuevo;
    }
  }

  // Fecha por defecto = hoy + días del plazo
  generarFechaPorDefecto(dias: number = this.diasPlazo): string {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    hoy.setDate(hoy.getDate() + dias);
    return hoy.toISOString().split('T')[0];
  }

  // Al cambiar la fecha, se actualizan los días
  onFechaSeleccionadaChange(nuevaFecha: string): void {
    this.fechaSeleccionada = nuevaFecha;
    this.actualizarDiasPlazo();
  }

  // Recalcular días entre hoy y la fecha seleccionada
  actualizarDiasPlazo(): void {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(this.fechaSeleccionada);
    fecha.setHours(0, 0, 0, 0);

    const diferenciaMs = fecha.getTime() - hoy.getTime();
    const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24)) + 1;

    this.diasPlazo = dias;
  }
}
