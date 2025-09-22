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
  monto = 200000;
  interesEA = 0.241;
  diasPlazo = 11;

  fianzaIncluida = true;
  firmaIncluida = true;

  fechaSeleccionada: string = this.generarFechaPorDefecto();

  get firma(): number {
    if (!this.firmaIncluida) return 0;
    if(this.diasPlazo >= 7 && this.diasPlazo <= 9) return 0;
    if(this.diasPlazo === 10) return 14670;
    if (this.diasPlazo >= 11 && this.diasPlazo <= 30) {
      return 14670 + (this.diasPlazo - 10) * 1170;
    }

    return 0 ;
  }

  get fianza(): number {
  if (!this.fianzaIncluida) return 0;

  // --- BASE SEGÚN EL MONTO ---
  const pasosMonto = Math.floor((this.monto - 100000) / 10000);
  const fianzaBase = 12820 + pasosMonto * 1282;
  const diasExtra = Math.max(this.diasPlazo - 7, 0);
  const incrementoDiario = 120 + pasosMonto * 12;

  // --- FIANZA TOTAL ---
  return fianzaBase + diasExtra * incrementoDiario;
}



  get interes(): number {
  const tasaDiaria = 0.00059;
  return Math.round(this.monto * tasaDiaria * this.diasPlazo);
  }

  get iva(): number {
    if (!this.fianzaIncluida) return 0;
    return Math.round(this.fianza * 0.19);
  }

  get total(): number {
    return Math.round(
      this.monto +
      this.interes +
      this.fianza +
      this.firma +
      (this.fianzaIncluida ? this.iva : 0)
    );
  }

  get fechaPagoTexto(): string {
    const fecha = new Date(this.fechaSeleccionada);
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Intl.DateTimeFormat('es-CO', opciones).format(fecha);
  }

  cambiarMonto(valor: number): void {
    const nuevo = this.monto + valor;
    if (nuevo >= 100000 && nuevo <= 1100000) {
      this.monto = nuevo;
    }
  }

  generarFechaPorDefecto(dias: number = this.diasPlazo): string {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    hoy.setDate(hoy.getDate() + dias);
    return hoy.toISOString().split('T')[0];
  }

  onFechaSeleccionadaChange(nuevaFecha: string): void {
    this.fechaSeleccionada = nuevaFecha;
    this.actualizarDiasPlazo();
  }

  actualizarDiasPlazo(): void {
  const hoy = new Date();
  const fecha = new Date(this.fechaSeleccionada);

  hoy.setHours(0, 0, 0, 0);
  fecha.setHours(0, 0, 0, 0);

  const diferenciaMs = fecha.getTime() - hoy.getTime();
  const milisegundosPorDia = 1000 * 60 * 60 * 24;

  // ✅ Sumar 1 para incluir el día de vencimiento
  this.diasPlazo = Math.round(diferenciaMs / milisegundosPorDia) + 1;
}

}