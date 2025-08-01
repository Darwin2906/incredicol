import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wasticredit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador-wasticredit.component.html',
  styleUrls: ['./simulador-wasticredit.component.css']
})
export class SimuladorWasticreditComponent {
  monto = 300000;
  plazo = 14; // 14 o 30 días

  // Interés diario compuesto real para 30 días basado en simulador original
  private readonly tasaInteres14 = 0.008368;
  private readonly tasaInteres30Diaria = 0.0005827; // 0.05827% diario compuesto ≈ 1.75% total

  private readonly porcentajeFirma14 = 0.14;
  private readonly porcentajeFirma30 = 0.30;

  get esPromocion(): boolean {
    return true; // siempre activa
  }

  get interesBase(): number {
    if (this.plazo === 14) {
      return parseFloat((this.monto * this.tasaInteres14).toFixed(2));
    } else {
      const interesCompuesto = this.monto * (Math.pow(1 + this.tasaInteres30Diaria, 30) - 1);
      return parseFloat(interesCompuesto.toFixed(2));
    }
  }

  get interes(): number {
    return parseFloat((this.interesBase * 0.5).toFixed(2));
  }

  get tarifaFirmaBase(): number {
    const porcentaje = this.plazo === 14 ? this.porcentajeFirma14 : this.porcentajeFirma30;
    return parseFloat((this.monto * porcentaje).toFixed(2));
  }

  get tarifaFirma(): number {
    return parseFloat((this.tarifaFirmaBase * 0.5).toFixed(2));
  }

  get totalPagar(): number {
    return parseFloat((this.monto + this.interes + this.tarifaFirma).toFixed(2));
  }

  cambiarMonto(valor: number): void {
    const nuevoMonto = this.monto + valor;
    if (nuevoMonto >= 300000 && nuevoMonto <= 1000000) {
      this.monto = nuevoMonto;
    }
  }
}

