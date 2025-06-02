import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simulador-rapicredit',
  standalone: false,
  templateUrl: './simulador-rapicredit.component.html',
  styleUrls: ['./simulador-rapicredit.component.css']
})
export class SimuladorRapicreditComponent implements OnInit {
  monto: number = 300000;
  plazo: number = 30;
  montoMin: number = 0;
  montoMax: number = 0;
  plazosDisponibles: number[] = [];
  pagoTotal: number = 0;
  interes: number = 0;
  comision: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Configuración desde los datos de la ruta
    const routeData = this.route.snapshot.data;
    this.montoMin = routeData['montoMin'];
    this.montoMax = routeData['montoMax'];
    this.plazosDisponibles = routeData['plazos'];

    // Parámetros de consulta
    this.route.queryParams.subscribe(params => {
      this.monto = Math.min(Math.max(+params['monto'] || this.montoMin, this.montoMax));
      this.plazo = this.plazosDisponibles.includes(+params['plazo']) 
        ? +params['plazo'] 
        : this.plazosDisponibles[0];
      this.calcularPrestamo();
    });
  }

  calcularPrestamo() {
    // Lógica específica de Rapicredit (ajusta según tus necesidades)
    const tasaDiaria = 0.0008; // Ejemplo: 0.08% diario
    this.interes = this.monto * tasaDiaria * this.plazo;
    this.comision = this.monto * 0.05; // 5% de comisión
    this.pagoTotal = this.monto + this.interes + this.comision;
  }

  actualizarSimulacion() {
    this.calcularPrestamo();
    // Aquí podrías navegar con los nuevos parámetros
    // this.router.navigate([], { 
    //   queryParams: { 
    //     monto: this.monto, 
    //     plazo: this.plazo 
    //   },
    //   queryParamsHandling: 'merge'
    // });
  }
}