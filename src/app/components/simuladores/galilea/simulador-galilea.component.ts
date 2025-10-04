import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-simulador-credito',
  templateUrl: './simulador-galilea.component.html',
  styleUrls: ['./simulador-galilea.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SimuladorGalileaComponent implements OnInit, OnDestroy {
  monto: number = 350000;
  fechaPago: string = '';
  fechaPrimeraCuota: Date = new Date();
  diasVencimiento: number = 0;

  firmaElectronica: boolean = true;

  interes: number = 0;
  costoFirma: number = 0;
  totalPagar: number = 0;
  tasaEA: number = 0.2436; // Tasa EA del 24.36% (valor de referencia)
  tasaDiaria: number = 0.0006058; // Tasa diaria única para todos los plazos

  primeraFechaBtn: Date = new Date();
  segundaFechaBtn: Date = new Date();
  primeraFechaDias: number = 0;
  segundaFechaDias: number = 0;

  private intervaloActualizacion: any;

  constructor(private route: ActivatedRoute) {
    this.calcularFechasBotones();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const montoParam = +params['monto'];
      const plazoParam = +params['plazo'];
      if (!isNaN(montoParam)) this.monto = montoParam;
      if (!isNaN(plazoParam)) this.diasVencimiento = plazoParam;

      this.calcularTodo();
    });
    
    this.iniciarActualizacionDiaria();
  }

  ngOnDestroy() {
    if (this.intervaloActualizacion) {
      clearInterval(this.intervaloActualizacion);
    }
  }

  iniciarActualizacionDiaria() {
    const ahora = new Date();
    const manana = new Date(ahora);
    manana.setDate(manana.getDate() + 1);
    manana.setHours(0, 0, 0, 0);
    
    const tiempoHastaMedianoche = manana.getTime() - ahora.getTime();
    
    setTimeout(() => {
      this.calcularFechasBotones();
      this.calcularTodo();
      
      this.intervaloActualizacion = setInterval(() => {
        this.calcularFechasBotones();
        this.calcularTodo();
      }, 24 * 60 * 60 * 1000); // 24 horas
    }, tiempoHastaMedianoche);
  }

  calcularFechasBotones() {
    const hoy = new Date();

    // Primera fecha: 30 del mes actual
    const dia30MesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 30);
    this.primeraFechaBtn = this.ajustarFechaLaborable(dia30MesActual);
    this.primeraFechaDias = Math.ceil(
      (this.primeraFechaBtn.getTime() - hoy.getTime()) / (1000 * 3600 * 24)
    );

    // Segunda fecha: 15 del mes siguiente
    const dia15MesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 15);
    this.segundaFechaBtn = this.ajustarFechaLaborable(dia15MesSiguiente);
    this.segundaFechaDias = Math.ceil(
      (this.segundaFechaBtn.getTime() - hoy.getTime()) / (1000 * 3600 * 24)
    );

    // 👉 Siempre selecciona la primera fecha como predeterminada
    this.fechaPago = this.primeraFechaBtn.toISOString().split('T')[0];
    this.diasVencimiento = this.primeraFechaDias;
    this.fechaPrimeraCuota = this.primeraFechaBtn;
  }

  ajustarFechaLaborable(fecha: Date): Date {
    const diaSemana = fecha.getDay();
    let diasAjuste = 0;

    if (diaSemana === 6) diasAjuste = -1; 
    else if (diaSemana === 0) diasAjuste = 1; 

    const fechaAjustada = new Date(fecha);
    fechaAjustada.setDate(fecha.getDate() + diasAjuste);
    return fechaAjustada;
  }

  seleccionarFecha(dias: number, fecha: Date): void {
    this.diasVencimiento = dias;
    this.fechaPago = fecha.toISOString().split('T')[0];
    this.fechaPrimeraCuota = fecha;
    this.calcularTodo();
  }

  obtenerFechaConDias(dias: number): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toLocaleDateString('es-CO');
  }

  // 🔹 Nueva función de costo de firma
  calcularCostoFirma(): number {
    if (!this.firmaElectronica) return 0;
    if (this.monto < 200000) return 0;

    let costoBase = 0;

    // Caso: plazo de 9 días
    if (this.diasVencimiento === 12) {
      if (this.monto <= 880000) {
        const bloques = Math.floor((this.monto - 200000) / 10000);
        costoBase = 50750 + (bloques * 1400);
      } else {
        costoBase = 145000;
      }
    } 
    // Caso: plazo de 24 días
    else if (this.diasVencimiento === 27) {
      if (this.monto <= 720000) {
        const bloques = Math.floor((this.monto - 200000) / 10000);
        costoBase = 72500 + (bloques * 1400);
      } else {
        costoBase = 145000;
      }
    } 
    // Si no aplica ninguna regla, que se quede en 0
    else {
      costoBase = 0;
    }

    return costoBase;
  }

  calcularTodo(): void {
    if (this.monto < 100000) this.monto = 100000;
    if (this.monto > 1500000) this.monto = 1500000;
    
    this.interes = Math.round(
      this.monto * this.tasaDiaria * this.diasVencimiento
    );

    this.costoFirma = this.calcularCostoFirma();

    this.totalPagar = this.monto + this.interes + this.costoFirma;
  }
}