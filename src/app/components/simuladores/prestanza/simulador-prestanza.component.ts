// simulador-prestanza.component.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar Router para redirección

@Component({
  selector: 'app-simulador-prestanza',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './simulador-prestanza.component.html',
  styleUrls: ['./simulador-prestanza.component.css']
})
export class SimuladorPrestanzaComponent implements OnInit {
  // Inyectar Router en el constructor
  constructor(private router: Router) {}

  // Señales reactivas
  plazo = signal<number>(1);
  monto = signal<number>(100000);
  mostrarAval = signal<boolean>(true); // Activado por defecto
  mostrarRed = signal<boolean>(true);  // Activado por defecto
  
  // Datos fijos según Prestanza
  porcentajeAval = 0.099; // 9.9%
  valorRedPorMes = 23562; // $23.562 por mes
  tasaMaxima = "25,17% E.A.";
  mesTasa = "agosto del 2025";

  // Factores de interés por plazo (meses)
  factoresInteres: { [key: number]: number } = {
    1: 0.01877,
    2: 0.02824,
    3: 0.03777,
    4: 0.04736,
    5: 0.05700,
    6: 0.06670
  };

  // Datos calculados
  resumen = computed(() => {
    const montoBase = this.monto();
    const plazoActual = this.plazo();
    const factorInteres = this.factoresInteres[plazoActual] || 0;
    
    // Cálculos exactos según los valores de Prestanza
    const interes = Math.round(montoBase * factorInteres);
    const aval = this.mostrarAval() ? Math.round(montoBase * this.porcentajeAval) : 0;
    const redPrestonza = this.mostrarRed() ? this.valorRedPorMes * plazoActual : 0;
    
    const totalCredito = montoBase + interes + aval + redPrestonza;
    const cuotaMensual = Math.round(totalCredito / plazoActual);

    return {
      interes,
      aval,
      redPrestonza,
      totalCredito,
      cuotaMensual
    };
  });

  // Opciones disponibles
  plazos = [1, 2, 3, 4, 5, 6];
  
  ngOnInit(): void {
    // Inicialización no necesaria ya que computed se actualiza automáticamente
  }

  actualizarPlazo(nuevoPlazo: number): void {
    this.plazo.set(+nuevoPlazo);
  }

  actualizarMonto(nuevoMonto: number): void {
    this.monto.set(+nuevoMonto);
  }

  toggleAval(): void {
    this.mostrarAval.update(val => !val);
  }

  toggleRed(): void {
    this.mostrarRed.update(val => !val);
  }

  formatearMoneda(valor: number): string {
    return '$' + valor.toLocaleString('es-CO', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  }

  // Función para redirigir a Prestanza
  redirigirAPrestanza(): void {
    // Redirigir a la página de Prestanza en una nueva pestaña
    window.open('https://prestanza.com/colombia/solicitudes/prestamos-rapidos', '_blank');
  }
}