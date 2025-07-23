import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-simulador-credito',
  templateUrl: './simulador-galilea.component.html',
  styleUrls: ['./simulador-galilea.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SimuladorGalileaComponent {
  monto: number = 350000;
  fechaPago: string = '';
  fechaPrimeraCuota: Date = new Date();
  diasVencimiento: number = 23;

  firmaElectronica: boolean = true;

  interes: number = 0;
  costoFirma: number = 0;
  totalPagar: number = 0;
  tasaEA: number = 0.2478; // Tasa equivalente anual (solo decorativa)

  tasaDiaria: number = 0.0006; // 0.06%

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const montoParam = +params['monto'];
      const plazoParam = +params['plazo'];
      if (!isNaN(montoParam)) this.monto = montoParam;
      if (!isNaN(plazoParam)) this.diasVencimiento = plazoParam;

      this.fechaPago = this.obtenerFechaPorDefecto();
      this.calcularTodo();
    });
  }

  obtenerFechaPorDefecto(): string {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + this.diasVencimiento);
    return hoy.toISOString().substring(0, 10);
  }

  calcularVencimiento(): void {
    const hoy = new Date();
    const fechaSeleccionada = new Date(this.fechaPago);
    if (isNaN(fechaSeleccionada.getTime())) return;

    const diferencia = fechaSeleccionada.getTime() - hoy.getTime();
    this.diasVencimiento = Math.ceil(diferencia / (1000 * 3600 * 24));
    this.fechaPrimeraCuota = new Date(fechaSeleccionada); // la cuota vence el mismo día
    this.calcularTodo();
  }

  seleccionarFecha(dias: number): void {
    this.diasVencimiento = dias;
    const nuevaFecha = new Date();
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    this.fechaPago = nuevaFecha.toISOString().substring(0, 10);
    this.fechaPrimeraCuota = new Date(nuevaFecha);
    this.calcularTodo();
  }

  obtenerFechaConDias(dias: number): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toLocaleDateString('es-CO');
  }

  calcularCostoFirma(): number {
    if (this.monto < 200000) return 0;
    if (this.monto >= 720000) return 145000;

    const base = 72500;
    const incremento = 1400;
    const pasos = Math.floor((this.monto - 200000) / 10000);

    return base + pasos * incremento;
  }

  calcularTodo(): void {
    // Limitar monto
    if (this.monto < 100000) this.monto = 100000;
    if (this.monto > 1500000) this.monto = 1500000;

    // Interés compuesto con tasa diaria
    this.interes = Math.round(
      this.monto * (Math.pow(1 + this.tasaDiaria, this.diasVencimiento) - 1)
    );

    // Firma electrónica
    this.costoFirma = this.firmaElectronica ? this.calcularCostoFirma() : 0;

    // Total a pagar
    this.totalPagar = this.monto + this.interes + this.costoFirma;
  }
}
