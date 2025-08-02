import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

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
    {
      id: 'lineru',
      nombre: 'Linerú',
      montoMin: 150000,
      montoMax: 1200000,
      plazoMin: 4,
      plazoMax: 30,
      tasaInteres: 0.023,
      comision: 0.03,
      tiempoDesembolso: 'En minutos',
      descuentos: 'Disponible según perfil',
      destacado: false,
      rutaSimulador: 'lineru',
      faqUrl: 'https://www.lineru.com/preguntas-frecuentes'
    },
    {
      id: 'solventa',
      nombre: 'Solventa',
      montoMin: 150000,
      montoMax: 5000000,
      plazoMin: 1,
      plazoMax: 32,
      tasaInteres: 0.28,
      comision: 0.01,
      tiempoDesembolso: '24 horas',
      descuentos: 'Tarifas según puntaje crediticio',
      destacado: true,
      rutaSimulador: 'solventa',
      faqUrl: 'https://solventa.co'
    },
    {
      id: 'galilea',
      nombre: 'Galilea',
      montoMin: 200000,
      montoMax: 1500000,
      plazoMin: 1,
      plazoMax: 31,
      tasaInteresDiaria: 0.0012,
      comisionFija: 25000,
      tiempoDesembolso: 'En minutos',
      descuentos: 'Descuentos para clientes recurrentes',
      destacado: true,
      rutaSimulador: 'galilea',
      faqUrl: 'https://galilea.co/preguntas-frecuentes'
    },
    {
  id: 'wasticredit',
  nombre: 'WastiCredit',
  montoMin: 300000,
  montoMax: 1000000,
  plazoMin: 1,
  plazoMax: 30,
  tasaInteres: 0.0000875,
  comisionFija: 45000,
  tiempoDesembolso: 'En minutos',
  descuentos: 'Descuento en firma electrónica',
  destacado: true,
  rutaSimulador: 'wasticredit',
  faqUrl: 'https://prestamos.wasticredit.com.co/faq'
  },
  {
      id: 'prestanza',
      nombre: 'Prestanza',
      montoMin: 100000,
      montoMax: 2000000,
      plazoMin: 1,
      plazoMax: 6,
      tiempoDesembolso: '24 horas',
      descuentos:'Descuentos para clientes recurrentes',
      destacado: true,
      rutaSimulador: 'prestanza',
      faqUrl:'https://prestanza.com/colombia/solicitudes/prestamos-rapidos'
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
      this.plazo <= p.plazoMax &&
      (p.id !== 'galilea' || this.plazo <= 25) // Mostrar Galilea si el plazo es 25 o menor
    )
    .map(p => {
      const tasaDiaria = p.tasaInteresDiaria ?? 0;
      const interes = this.monto * tasaDiaria * this.plazo;

      const comision = p.comisionFija ?? (this.monto * (p.comision ?? 0));
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
