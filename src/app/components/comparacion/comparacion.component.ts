import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ← IMPORTANTE
import { Plataforma } from '../../models/plataforma.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comparacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comparacion.component.html',
  styleUrls: ['./comparacion.component.css']
})
export class ComparacionComponent implements OnInit {
  monto: number = 100000;
  plazo: number = 30;

  constructor(private router: Router) {} // ← AÑADE ESTO

  plataformas: Plataforma[] = [
    {
      id: 'rapicredit',
      nombre: 'Rapicredit',
      montoMin: 100000,
      montoMax: 1000000,
      plazoMin: 5,
      plazoMax: 150,
      tasaInteres: 0.02,
      comision: 0.05,
      tiempoDesembolso: '24 horas',
      descuentos: '10% si es tu primer crédito',
      destacado: true,
      rutaSimulador: 'rapicredit',
      faqUrl: 'https://www.rapicredit.com.co/faq'
    }
  ];

  plataformasFiltradas: any[] = [];

  ngOnInit() {
    this.calcularOpciones();
  }

  calcularOpciones() {
    this.plataformasFiltradas = this.plataformas
      .filter(p =>
        this.monto >= p.montoMin &&
        this.monto <= p.montoMax &&
        this.plazo >= p.plazoMin &&
        this.plazo <= p.plazoMax
      )
      .map(p => {
        const interes = this.monto * p.tasaInteres * (this.plazo / 30);
        const comision = this.monto * p.comision;
        const pagoTotal = this.monto + interes + comision;

        return {
          ...p,
          pagoTotal: Math.round(pagoTotal),
          interes: Math.round(interes),
          comision: Math.round(comision),
          costoDiario: Math.round(pagoTotal / this.plazo),
          plazos: [this.plazo]
        };
      });
  }

  irASimulador(id: string) {
    this.router.navigate([`/simulador-${id}`], {
      queryParams: {
        monto: this.monto,
        plazo: this.plazo
      }
    });
  }
}
