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

  get firma(): number {
    if (!this.firmaIncluida) return 0;
    if (this.diasPlazo < 10 || this.diasPlazo > 30) return 0;
    return 14670 + (this.diasPlazo - 10) * 1170;
  }

  get fianza(): number {
  if (!this.fianzaIncluida) return 0;
  if (this.diasPlazo < 7 || this.diasPlazo > 30) return 0;

  const montoMin = 100000;
  const pasoMonto = 10000;
  const baseFianza100k7dias = 12820;
  const incrementoDia = 120;
  const incrementoMonto7dias = 1282;
  const aumentoIncrementoPorDia = 12;

  const pasosDia = this.diasPlazo - 7;
  const pasosMonto = Math.floor((this.monto - montoMin) / pasoMonto);

  const basePlazo = baseFianza100k7dias + pasosDia * incrementoDia;
  const incrementoPor10k = incrementoMonto7dias + pasosDia * aumentoIncrementoPorDia;

  return Math.round(basePlazo + pasosMonto * incrementoPor10k);
}






  get interes(): number {
    const tasaDiaria = 0.000602;
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
    return fecha.toLocaleDateString('es-CO');
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
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(this.fechaSeleccionada);
    fecha.setHours(0, 0, 0, 0);

    const diferenciaMs = fecha.getTime() - hoy.getTime();
    const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24)) + 1;

    this.diasPlazo = dias;
  }
}
