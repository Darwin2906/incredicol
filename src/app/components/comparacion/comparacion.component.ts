import { Component, OnInit } from '@angular/core';
import { Plataforma } from '../../models/plataforma.model';

@Component({
  selector: 'app-comparacion',
  templateUrl: './comparacion.component.html',
  styleUrls: ['./comparacion.component.css']
})
export class ComparacionComponent implements OnInit {
  monto: number = 300000;
  plazo: number = 30;

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
    },
    // Puedes agregar más plataformas aquí...
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
    window.location.href = `/simulador-${id}?monto=${this.monto}&plazo=${this.plazo}`;
  }
}
